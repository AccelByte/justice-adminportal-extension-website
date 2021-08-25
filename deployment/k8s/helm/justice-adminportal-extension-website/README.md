# Justice-adminportal-extension-website helm chart

## Prerequisites

* helm = 3.0

## Configuration

* The following table lists configurable parameters inside **values.yaml** file of the
justice-adminportal-extension-website chart and their example values.

* `Conditional` column has three values, **Required** and **Optional**. **Required** means that value must be set even when deploying JIB because it has no default value. **Optional** means that value has default value and could be left blank when deploying JIB.

Parameter | Description | Example | Environment Variables tag | Conditional
--- | --- | --- | --- | ---
`namespace` | kubernetes namespace | `default = dev` | K8S_NS | Optional  |
`stage` | environment stage | `default = dev` | STAGE | Optional  |
`image.tag` | service image tag | `144436415367.dkr.ecr.us-west-2.amazonaws.com/justice-adminportal-extension-website:1.2.0` | IMAGE_TAG  | **Required**  |
`image.pullSecret.name` | image pull secret name | `some secret name` | IMAGE_PULL_SECRET_NAME | Optional  |
`replicaCount` | service replica | `1` | REPLICAS | Optional  |
`autoscaling.replicas.min` | min replica | `1` | MIN_REPLICAS | Optional  |
`autoscaling.replicas.max` | max replica | `1` | MAX_REPLICAS | Optional  |
`canary.enabled` | if `true`, create flagger's canary object | `true or false (fill it with false as default value)` | CREATE_CANARY_OBJECT | Optional  |
`canary.gatewayName` | istio gateway name | `justice-gateway` | ISTIO_GATEWAY_NAME | Optional  |
`canary.webhookEnabled` | If you want to enable webhook, you need to set this and canary.enabled to true | `true or false (fill it with false as default value)` | USE_FLAGGER_WEBHOOK | Optional  |
`canary.progressDeadlineSeconds` | determine progress deadline the maximum time in seconds | 600 |  | Optional  |
`canary.analysisFailureThreshold` | determine number of failed metric analysis before rollback | `5` | CANARY_ANALYSIS_FAILURE_THRESHOLD | Optional  |
`canary.analysisMaxWeight` | determine max traffic percentage to the canary version | `50` | CANARY_ANALYSIS_MAX_WEIGHT | Optional  |
`canary.analysisStepWeight` | determine traffic increment step percentage | `25` | CANARY_ANALYSIS_STEP_WEIGHT | Optional  |
`canary.requestSuccessRateThreshold` |   threshold for non-5xx response | `99` | | Optional  |
`canary.requestSuccessRateInterval` | determine the metric check interval for request success rate | `1m` | | Optional  |
`canary.latencyThreshold` | determine #maximum latency threshold in millisecond | `500` | | Optional  |
`canary.latencyInterval` | determine the metric check interval for request latency | `1m` | | Optional  |
`canary.flaggerAutomationTest.enabled` | If you want to use flagger + automation test set this and canary.webhookEnabled to true | `true or false (fill it with false as default value)` | USE_FLAGGER_AUTOMATION_TEST | Optional  |
`canary.flaggerAutomationTest.failureThreshold` | determine the number of failed metric analysis before rollback | `1` | CANARY_AUTOMATION_TEST_FAILURE_THRESHOLD | Optional  |
`canary.flaggerAutomationTest.webhookTimeout` | determine the webhook timeout. This value varies between services | `25m` | CANARY_AUTOMATION_TEST_WEBHOOK_TIMEOUT | Optional  |
`canary.flaggerAutomationTest.webhookServiceBasePath` | path for this service without leading or trailing slash | `payment-station` | CANARY_AUTOMATION_TEST_SERVICE_BASEPATH | Optional  |
`canary.flaggerAutomationTest.k8sSecrets` | name of mounted k8s secret by flagger-automation-tester pod | `automation-test-creds` | CANARY_AUTOMATION_TEST_K8S_SECRETS | Optional  |
`canary.flaggerAutomationTest.k8sConfigmap` | name of mounted k8s configmap by flagger-automation-tester pod | `automation-test-configs` | CANARY_AUTOMATION_TEST_K8S_CONFIGMAP | Optional  |
`canary.flaggerAutomationTest.serviceCanaryEndpoint` | internal hostname of this service's canary pod | `http://justice-platform-paymentstation-canary` | CANARY_AUTOMATION_TEST_SERVICE_CANARY_ENDPOINT | Optional  |
`service.enabled` | if `true`, create k8s service object | `true or false (fill it with true as default value)` | INCLUDE_K8S_SERVICE_OBJECT  | Optional
`resources.limit.cpu` |  pod CPU limit | `10m` | CPU_LIMIT | Optional  |
`resources.limit.memory` | pod memory limit | `64Mi` | MEMORY_LIMIT | Optional  |
`resources.requests.memory` | pod memory request | `64Mi` | MEMORY_REQUEST | Optional  |
`resources.requests.cpu` | pod CPU request | `10m` | CPU_REQUEST | Optional  |
`readinessProbe.periodSeconds` | PeriodSeconds specifies How often (in seconds) to perform the probe | `10` | | Optional  |
`readinessProbe.timeoutSeconds` | TimeoutSeconds is number of seconds after which the probe times out | `10` | | Optional  |
`readinessProbe.successThreshold` | Minimum consecutive successes for the probe to be considered successful after having failed | `1` | | Optional  |
`readinessProbe.failureThreshold` | Maximum try for probe to be failed before giving up | `10`  | | Optional  |
`livenessProbe.initialDelaySeconds` | InitialDelaySeconds is number of seconds after the container has started before liveness probes are initiated | `20` | | Optional  |
`livenessProbe.periodSeconds` | PeriodSeconds specifies How often (in seconds) to perform the probe | `15` | | Optional  |
`healthCheck.readiness.path` | healthCheck path is HTTP route for checking service readiness | `/healthz` | | Optional  |
`healthCheck.liveness.path` | healthCheck path is HTTP route for checking service liveness | `/healthz` | | Optional  |
`justice.path` | service base path | `/iam/, /basic/, /legal/` | BASE_PATH | Optional  |
`justice.domain` | istio gateway host | `demo.accelbyte.io` | BASE_DOMAIN | Optional  |
`justice.commonVariables.enabled` | flag to mount common ConfigMaps across namespace | `true` | | Optional  |
`cluster.provider` | cluster provider name | `kops, eks, gke (fill it with kops as default value)` | CLUSTER_PROVIDER  | **Required**  |
`cluster.resourceAccess` | resourceAccess is parameter to indicate whether the service required access to cluster provider resources or not | `kiam, irsa, or instancerole` | RESOURCE_ACCESS_METHOD  | **Required** |
`cluster.iam.role.arn` | iam role arn, used when using kops as cluster provider | `arn:aws:iam::144436415367:role/ab-service-role` | KIAM_ROLE_ARN | Optional  |
`serviceAccount.name` | service account name used as AWS resource authentication, used when using non-kops as cluster provider (e.g:eks) | `default value: justice` | | Optional  |
`pdb.enabled` | Determine PodDisruptionBudget should be created or not | `true, false (fill it with true as default value)` | CREATE_PDB_OBJECT | Optional  |
`pdb.minAvailable` | Determine `spec.minAvailable` for PDB Object | `1 (integer, fill it with 1 as default value)` | PDB_MIN_AVAILABLE | Optional  |
`virtualService.enabled` | Determine virtual service will be deployed or not, need to set to `false` if there is flagger canary deployment or if the cluster does not use Istio virtual service | `true or false (fill it with false as default value)` | INCLUDE_VS | Optional  |
`affinity.spotInterruptionAffinity.enabled` | determine to use spot interruption affinity (true/false) | true/false | ENABLE_SPOT_ITN_AFFINITY  | Optional  |
`affinity.spotInterruptionAffinity.nodeAffinity.key` | determine spot itn node affinity key | alpha.eksctl.io/nodegroup-name | SPOT_ITN_NODE_AFFINITY_KEY  | Optional  |
`affinity.spotInterruptionAffinity.nodeAffinity.value` | determine spot itn node affinity values | ng-on-demand | SPOT_ITN_NODE_AFFINITY_VALUES  | Optional  |
`affinity.spotInterruptionAffinity.podAntiAffinity.topologyKey` | determine spot itn pod anti affinity main options topologKey   | alpha.eksctl.io/nodegroup-name | SPOT_ITN_POD_ANTI_AFFINITY_TOPOLOGY_KEY  | Optional  |
`configMap.service.JUSTICE_BASE_URL`  | envar used by the service, determine base url  | `https://dev.accelbyte.io, https://jib.<customer_name>.accelbyte.io`  | BASE_URL | **Required**  |
`configMap.service.JUSTICE_BASE_PATH`  | envar used by the service, determine base path of this service  | `default = "/admin-extension/"`  | BASE_PATH | **Required**  |


**tips**: You can configure values.yaml by directly modifying the file (with modifying env var tag),
or by exporting each `env var tag` as shell environment variables before executing the helm command.

**notes**:

* As per chart version **0.4.1**, every variable on **files/** are moved to **values.yaml**. If you want to add new configmap's or secret's variables, please add them to **values.yaml** instead.

* Every variable on configmap is not iterated anymore, but secret is still remain iterated from values (please visit **templates/secret.yaml** on templates for example).

* Every configmap's variable should be declared on **values.yaml**.

## Generating deployment template

```bash
  cat values.yaml | envsubst > /tmp/values.yaml
  helm template justice-adminportal-extension-website . -f /tmp/values.yaml \
    --set timestamp=$(date +%s%N) > justice-adminportal-extension-website.yaml
```

> **Documentation**: https://accelbyte.atlassian.net/wiki/spaces/runbook/pages/577602325/Setup+Helm+Deployment