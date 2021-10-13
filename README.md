# Justice Admin Portal Extension Website

## Overview
Justice Admin Portal Extension Website is a web application that extends Admin Portal functionality, mainly to fulfill client's needs that not included in Admin Portal.
Please also check this [Development Guideline](https://accelbyte.atlassian.net/wiki/spaces/CC/pages/2271379457/Admin+Portal+Extension+Development+Guideline) 

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

## Folder Structure
```
src
├── api
│   └── backend-service-name 
│       ├── models
|       |   └── client.ts (where we have model)
|       └── client.ts (where we place api call utils)
├── app-messages (initialize global events here)
├── app-states (place global states here)
├── app-tasks (place tasks to run on App's didMount before render any UI)
│   ├── index.ts (register tasks here)
│   └── initATask.tsx
├── packages (create custom modules here, please follow the module example for the folder structure)
│   └── Module
│       └── SubModule
├── routes
│   └── PrivateRoutes.tsx (register submodule's route here)
```

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

#### Registering module/submodule pages to route
Import module/submodule's route component and register in [src/routes/PrivateRoutes](./src/routes/PrivateRoutes.tsx)

### Common components
We have common components that match with AP's design system. 

```typescript jsx
import { Card, Page } from "justice-ui-library";

const SomeComponent = () => (
  <Page title="User">
    <Card cardTitle={"Current User"} noHorizontalMargin>
      <ContentHere />
    </Card>
  </Page>
);
```

## Network Call

We do network call with [axios](https://github.com/axios/axios) and runtime checking with [io-ts](https://github.com/gcanti/io-ts). In summary this is the step on how to do network call.

1. Create response model
2. Create network call utility
3. Do network call
4. Handle success and error after network call

### Create Response Model

We use runtime checking with `io-ts` to make sure we get expected response data. Please check [io-ts](https://github.com/gcanti/io-ts) for complete guidelines.

```typescript
export const Item = ioTs.intersection([
  ioTs.type({
    itemId: string
  }),
  ioTs.partial({
    description: ioTs.string,
  }),
]);
export type Item = ioTs.TypeOf<typeof  Item>;

export class ItemDecodeError extends DecodeError {}
```

### Create Network Call Utility

We mainly use `guardNetworkCall` to guard a network call. This function handles network call and do runtime checking.

`guardNetworkCall` has 4 parameters:
1. Network call callback, this callback is expected to return a `AxiosResponse`
2. Response model, the function will do runtime check to validate this model and the response data
3. DecodeError class, this class will be thrown when response data and response model is mismatch
4. transform error callback, change your error with this callback

`guardNetworkCall` will always has this return object
```typescript
const { response, error } = await guardNetworkCall(...params);
```
`response` will be null when an error thrown inside `guardNetworkCall` and vice versa. Any error thrown will be in `error` (network call error like 400, runtime check error).

#### Network Call Utility
```typescript
import * as ioTs from "io-ts";
import { guardNetworkCall } from "src/api/networkCallTypeguard";

export function fetchSomething(network: Network, namespace: string) {
  return guardNetworkCall(
          () => network.get(`/endpoint`),
          ioTs.array(Item),
          ItemDecodeError,
          (error) => error
  );
};
```

### Do Network call
```typescript
fetchSomething(networkManager.withCredentials(), namespace)
        .then((result) => {
          if (!!result.error) throw result.error;
          // do your things here
          console.log(result.response.data);
        })
        .catch((error) => {
          // handle error here
        })
```

## Toast Notification

When we have successfully do something or error happens during a process, we might want to show a toast notification in Admin Portal.
In case we want to show a toast notification in Admin Portal, here is how:

- `showToastNotification` : general function to show a toast notification.
- `showToastNotificationSuccess` : show success notification, basically run `showToastNotification` with success params.
- `showToastNotificationError` : show error notification. When error given is `AxiosError`, this function will try to extract `errorCode` and get translation for the error code. You can pass a default error message when no error code found.

```typescript
import { 
  showToastNotification, 
  showToastNotificationSuccess,
  showToastNotificationError,
  ToastType 
} from "src/utils";

showToastNotification({ appearance: ToastType.info, message: "Info message here" });

showToastNotificationSuccess("Success message here");

showToastNotificationError(errorObject, "Default error message here")
```

In case you run AP extension without AP, this notification will only do console.log

## FAQs

Please check [here](https://accelbyte.atlassian.net/wiki/spaces/CC/pages/2271379457/Admin+Portal+Extension+Development+Guideline#FAQ)
