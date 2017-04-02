# vue-skeleton
A vue skeleton

## Features

* vuex
* vue-router
* webpack 2 
* SCSS 
* CSS Modules
* versioning 
* Typescript support
* vuex-connect
* seng-generator
* seng-config
* seng-scss
* airbnb coding standard integrated using eslint
* preview server with gzip
* modernizr
* optional eslint-loader
* svg support
* https support
* i18n

## Coding

* Every component folder is in PascalCase
* Every component contains a index.js to integrate vuex-connect and for easy import ```import HomePage from 'page/HomePage'```
* Every page name ends with Page
* Always use the PascalCase component name in your templates ```<ScrollBar/>```

## Commands

* ```npm run dev```: Starts the dev server
* ```npm run build```: Create a build
* ```npm run preview```: Preview the build in the browser
* ```npm run lint```: Run eslint
* ```npm run svg```: Process and optimize svg for use with the Icon component


## Seng generator templates

* component (```sg component <name>```) : Create a component 
* connected-component (```sg connected-component <name>```): Create a component with vuex-connect integrated 
* page (```sg page <name>```): Create a page
* connected-page (```sg connected-page <name>```): Create a page with vuex-connect integrated
* store (```sg store <name>```): Create a store module


