* Contents

*   [Prerequisites](#prerequisites)
*   [Dependencies](#dependencies)
*   [Building](#building)
    *   [Prerequisites](#prerequisites-2)
    *   [Build](#build)
*   [Deployment](#deployment)
    *   [Prerequisites](#prerequisites-3)
    *   [Deploy](#deploy)
*   [Updating Ingress](#updating-ingress)

# **Prerequisites**
=================

*   Development and Build Requirement:
    *   Docker >= v17.03.
    *   Docker-compose >= v1.19.
    *   GNU Make.
    *   Node.js version 10
    *   The link to repo for example: [https://bitbucket.org/accelbyte/justice-adminportal-extension-website/src/master/](https://bitbucket.org/accelbyte/justice-adminportal-extension-website/src/master/) . Make sure the name of repositories is correct.
*   Deployment Requirement:
    *   AWS EC2
    *   Kubectl. To connect to the kubernetes cluster make sure you already have the `config` file and follow the steps:
        *   export KUBE\_CONFIG=<path\_to\_config\_file> 
        *   Try this command `kubectl get namespaces` . If the output shows list of namespaces then you already connected

# **Dependencies**
================

*   IAM client without permission v3.17.1.
*   Basic Service v1.10.0.
*   All other backend services that Admin Portal will manage (adjust with the same Justice 2.12.0 version for each services).


# **Building**
============

## Prerequisites
-------------

*   Docker with support for Linux containers.
*   GNU Make.

## Build
-----

1.  Clone the repository first then go into the directory  
    
    ```
    $ git clone git@bitbucket.org:accelbyte/justice-adminportal-extension-website.git
    $ cd justice-adminportal-extension-website
    ```
    
2.  These environment variables are needed to build the AP Extension Website:
    
    |     |     |     |
    | --- | --- | --- |
    | Environment Variables | Example Value | Description |
    | JUSTICE\_BASE\_URL | [https://dev.accelbyte.io](https://dev.accelbyte.io) | The base URL of the API which the Admin Portal Extension will call |
    | JUSTICE\_BASE\_PATH | /admin-extension | Base path for AP extension |

    
3.  Run build script:
    
    **Run build script**
    
    ```
    make build
    ```
    
    The result should be a docker image `justice-adminportal-extension-website:unknown`. We recommend to tag the docker image with its version. e.g:  
      
    
    **Tag docker image**
    
    ```
    docker tag justice-adminportal-extension-website:unknown justice-adminportal-extension-website:v0.1.0
    ```
    
    The docker image is then ready to be deployed or uploaded into Docker image repo, such as AWS ECR. To push the image to ECR you can follow the instruction in this link: [How To Push Image To ECR From Local](https://accelbyte.atlassian.net/wiki/spaces/EN/pages/263160324/How+To+Push+Image+To+ECR+From+Local)
    
# **Deployment** 
===============
    
## Prerequisites
-------------

*   Kubernetes cluster. Recommended: v1.11.
*   Kubectl. Recommended: v1.11.
*   AP Extension Website Docker image.

## Deploy
------

1.  Fill the deployment config in **deployment/k8s/tools/config.conf**
2.  Inside **deployment/k8s/tools/config.conf**
    
    |     |     |     |     |     |
    | --- | --- | --- | --- | --- |
    | Name | Required | Example Value | Kubernetes Configmap/Secret | Description |
    | REALM\_NAME | Yes | dev | justice-common-variables | The realm where this website will be deployed. |
    | AWS\_REGION | Yes | us-west-2 | justice-common-variables | The AWS region where this website will be deployed. |
    | REPLICAS | Yes | 2   |     | Number of replicas |
    | SERVICE\_NAME | Yes | justice-adminportal-extension-website |     | Service name |
    | CPU\_LIMIT | Yes | 10m |     | Number of maximum CPU allowed |
    | MEMORY\_LIMIT | Yes | 64Mi |     | Number of maximum memory allowed |
    | REQUEST\_MEMORY | Yes | 64Mi |     | Number of allocated memory |
    | REQUEST\_CPU | Yes | 10m |     | Number of allocated CPU |
    | ```ADMINPORTAL_EXTENSION_WEBSITE_IMAGE``` | Yes | justice-adminportal-extension-website:latest |     | Name of container image |
    | REVISION\_ID | Yes | 1.0.0 |     | Provided by Jenkinsfile by default. If not build by Jenkins then need to provide this or the default value will "unknown" |
    | MIN\_REPLICAS | Yes | 2 |   | Helm variable, minimum pod replicas |
    | MAX\_REPLICAS | Yes | 10 |   | Helm variable, maximum pod replicas |
    | INCLUDE\_VS | No | false |   | helm variable, include helm virtual service (true/false) |
    | OLD\_VS | No | iam-virtualservice |   | (optional) if needed to remove the old virtual service |
    | JUSTICE\_BASE\_URL | Yes | [https://dev.accelbyte.io](http://dev.accelbyte.io) | justice-adminportal-extension-website-variables | The base url of the API which the AP Extension Website will call |
    | JUSTICE\_BASE\_PATH | Yes | /admin-extension | justice-adminportal-extension-website-variables | Base path for AP Extension website |
    
    
3.  Run **deployment/k8s/tools/configure.sh.**It will generate Kubernetes deployment yaml in **deployment/k8s/tools/output**
    
    (Make sure all the variables in `config.conf` that used in the output yaml is provided)
    
    ```
    # Fill the config.conf
    # Note that this is only partial value to be filled
        
    # General Justice Configuration
    REALM_NAME=demo
    JUSTICE_BASE_URL=https://dev.accelbyte.io
    JUSTICE_BASE_PATH=/admin-extension
    K8S_NS=demo
    ################################################################################
    ```
    
    ```
    $ cd deployment/k8s/tools
    $ . configure.sh
    ```
    
    |     |     |     |
    | --- | --- | --- |
    |     | Name | Description |
    | 1   | environment-variable-configmap.yaml | Dependency of main deployment. Environment variables required by the service in order to be run. |
    | 2   | deployment.yaml | Main deployment |
    
    \--
    
4.  Go to **deployment/k8s/tools/output/** , IAM service can be deployed to Kubernetes e.g:
    
    **Deploy to K8s**
    
    ```
    $ kubectl apply -f 01_environment-variable-configmap.yaml
    $ kubectl apply -f deployment.yaml
    ```
    
    \--
        

# **Updating Ingress**
====================

To make AP Extension Website accessible from outside the Kubernetes cluster, it needs to be registered to ingress.

Registering to ingress can be done with adding these to the existing ingress:

**Ingress.yaml**

```
...
    http:
      paths:
      ...
      - backend:
          serviceName: justice-adminportal-extension-website
          servicePort: 80
        path: /admin-extension/*
```

  

The ingress can be updated with:

**Deploy to K8s**

```
$ kubectl edit ingress -n <K8S_NAMESPACE>
```