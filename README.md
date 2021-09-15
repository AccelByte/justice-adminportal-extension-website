# Justice Admin Portal Extension Website

## Overview
Justice Admin Portal Extension Website is a web application that extends Admin Portal functionality, mainly to fulfill client's needs that not included in Admin Portal.

## Quick Start
Project need to be built first in order to make it works:
```
make build
```

To start the development environment, run the following command:
```
make run
```
The project will be served on `localhost:3003`

## Build Requirements
* Docker with support for Linux containers
* GNU Make
* Internet connection

## Development Requirements
* See _Build Requirements_
* Docker Compose
* IDE (we like WebStorm)
* To add / change / remove environment variables:
    1. Change **this (README.md)** document
    2. Add environment variables that is read on runtime in **deployment/k8s/deployment.yaml**,  **config/env.js**, and  **docker-compose.yaml**
    3. Add environment variables, both that is read on runtime or build time on **makefile**
    4. Add conditions (if necessary) on **scripts/env-guard**

## Deployment Requirements
Environment variables that will be read on runtime :

| Environment Variables              | Optional | Description                                                        |
|------------------------------------|----------|--------------------------------------------------------------------|
| JUSTICE_BASE_URL                   | No       | The base url of the API which the Admin Portal will call           |
| JUSTICE_BASE_PATH                  | No       | The base path of extension                                         |
| JUSTICE_PUBLISHER_NAMESPACE        | Yes      | The publisher namespace                                            |
| JUSTICE_ADMIN_BEARER_TOKEN_DEVMODE | Yes      | For dev purpose only, the bearer token of currently logged in user |

## Project Module
To make our custom works shown in Admin Portal, we need to set up modules and submodules.
- Module: The high level service of Admin Portal e.g. Analytics, Users Management, E-Commerce, etc
- SubModule: The specific features/packages inside Module e.g. Users in Users Management, Stores in E-Commerce, etc

### Creating Module
To create new module, please follow these steps:
- Create new folder inside packages
- Add new `module.json` file inside `module` folder
```json
{
  "id": "example",                                    // unique module id
  "title": "module.example.title",                    // translation key for module title
  "icon": "icon-ab-sidebar-users"                     // icon that will be shown in AP sidebar
}
```

### Creating SubModule
To create new submodule, please follow these steps:
- Inside a `module`, create new folder
- Add `submodule.json` file inside `submodule` folder
```json
{
  "id": "example-submodule",                          // unique module id
  "title": "module.example.submodule.example.title",  // translation key for module title
  "link": "/namespace/{namespace}/example-submodule", // link to access the submodule page
  "permission": {
    "resource": "ADMIN:NAMESPACE:{namespace}:USER:*", // permission to access submodule
    "action": 2                                       // action to access from AP sidebar
  },
  "allowedNamespaces": ["accelbyte"]                  // optional, allowed namespace to access submodule
}
```
- Create a React component just like usual Admin Portal packages

#### Restricting access to specific namespace
Sometimes we want a feature to only available on specific namespace, 
we can use `allowedNamespaces` as a rule to hide/show the feature. 
Please refer to the table below on how to apply the rule.

| Value                                                                | Output                                                                                   |
|----------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| allowedNamespaces: undefined                                         | feature will appear in all namespace                                                     |
| allowedNamespaces: []                                                | feature will appear in all namespace                                                     |
| allowedNamespaces: ["accelbyte"]                                     | feature will appear ONLY in "accelbyte" namespace                                        |
| allowedNamespaces: ["accelbyte", "gamenamespace1", "gamenamespace2"] | feature will appear ONLY in "accelbyte", "gamenamespace1" and "gamenamespace2" namespace |