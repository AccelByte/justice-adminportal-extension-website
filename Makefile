# Copyright (c) 2021 AccelByte Inc. All Rights Reserved.
# This is licensed software from AccelByte Inc, for limitations
# and restrictions contact your company contract manager.

ifeq ($(CUSTOMER),)
    SERVICE=justice-adminportal-extension-website
else
    SERVICE=$(CUSTOMER)-justice-adminportal-extension-website
endif


SERVICE_PATH=$(SERVICE)
BUILDER_IMAGE=$(SERVICE)-builder
REVISION_ID?=unknown

RUN=docker run --rm \
	-v $(CURDIR):/workspace/$(SERVICE_PATH) \
    -v $(SSH_AUTH_SOCK):$(SSH_AUTH_SOCK) \
    -e SSH_AUTH_SOCK=$(SSH_AUTH_SOCK) \
	-e GIT_HASH=$(GIT_HASH) \
	-e REVISION_ID=$(REVISION_ID) \
	-w /workspace/$(SERVICE_PATH)

.PHONY: build test

build:
	docker build -f Dockerfile.build -t $(BUILDER_IMAGE) .
	$(RUN) $(BUILDER_IMAGE) npm rebuild --update-binary
	$(RUN) $(BUILDER_IMAGE) yarn install
	$(RUN) $(BUILDER_IMAGE) yarn build
	$(RUN) $(BUILDER_IMAGE) yarn generate:extension
	$(RUN) $(BUILDER_IMAGE) yarn generate:version
	docker build --tag="$(SERVICE):$(REVISION_ID)" -f Dockerfile.release .

run:
	docker-compose -f docker-compose-dev.yaml up

runProd:
	docker-compose -f docker-compose-prod.yaml up

clean:
	docker-compose down
	-$(RUN) --user=root $(BUILDER_IMAGE) rm -rf node_modules
	-$(RUN) --user=root $(BUILDER_IMAGE) rm -rf build
	-docker rmi -f $(SERVICE)-builder $(SERVICE):$(REVISION_ID)

test:
	$(RUN) $(BUILDER_IMAGE) yarn lint

image-scan:
	mkdir -p cache result
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
	-v $(CURDIR)/cache/:/root/.cache/ -v $(CURDIR)/result/:/root/result:rw \
	aquasec/trivy -q -o /root/result/image-result.txt $(SERVICE):$(REVISION_ID)
	docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
	-v $(CURDIR)/cache/:/root/.cache/ aquasec/trivy --exit-code 1 \
	--severity $(LEVEL) $(SERVICE):$(REVISION_ID) || true
	docker ps -a | awk '{ print $$1,$$2 }' | grep aquasec/trivy | \
	awk '{print $$1 }' | xargs -I {} docker stop {}
	docker rmi -f aquasec/trivy:latest
	rm -rf cache
