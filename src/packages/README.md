# Justice Admin Portal Website Packages

## Overview
This is a guideline on how we develop module/submodule in AP Extension.

## Folder Structure

This folder structure can be applied to Module only or Sub Module.

### Module only or Sub Module

```
.
├── components
│   └── ListTable 
│       └── ListTable.tsx
├── pages
│   └── ListPage
│       └── ListPage.tsx
├── routes
│   └── routes.ts
└── module.json/submodule.json
```

### Module with Sub Modules

```
.
├── SubModule1
├── SubModule2
└── module.json
```

Folder structure for Sub Module will be same with above

### Details

`components`: This folder store component files, the component should only receive data and callback props.
we should not have logic here.

`pages`: This folder contains higher level of files, this is where we have logic. Make a request call,
prepare data so it's ready to use in component, callbacks.

`routes`: Place routes used in the package here.

We can also have other folders like utils, constants, etc. Anything you need.

## Keep in mind
We try to keep package as modular as possible and not dependent to each other.
So when you need component or util function from other package, please make a copy or common component/util function. 
