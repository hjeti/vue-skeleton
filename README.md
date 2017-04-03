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

Vue-skeleton has [seng-generator](https://github.com/mediamonks/seng-generator) templates integrated for easy creation of components, pages and store modules.

Before you can use seng-generator you have to install it.

Run ```npm install seng-generator -g```

After the installation is complete you can generate code based on the following templates:
* component (```sg component <name>```) : Creates a component 
* connected-component (```sg connected-component <name>```): Creates a component with vuex-connect integrated 
* page (```sg page <name>```): Creates a page
* connected-page (```sg connected-page <name>```): Creates a page with vuex-connect integrated
* store (```sg store <name>```): Creates a store module

It's also possible to modify or add templates. Check the [documentation](https://github.com/mediamonks/seng-generator) of seng-generator for more info.

## SVG

It's super easy to use svgs in vue-skeleton. 

* Add your svgs to the svg folder (```asset/svg```)
* Run ```npm run svg``` to optimize your svgs and copy them to the ```src/asset/svg``` folder
* Use them in the Icon component ```<Icon name="check" class="icon-check" />```

The Icon component is globally registered in Vue so you can use it without importing and registering in your components.

## SCSS

Vue-skeleton uses SCSS for styling. It also uses CSS modules to local scope the styling of your components. 
Check https://vue-loader.vuejs.org/en/features/css-modules.html for more information.

There are two main SCSS files:

* ```screen.scss``` is the SCSS file for all your global styling. By default it only imports the normalize.css module.
* ```utils.scss``` is the SCSS file for all the mixins and variables. By default it imports [seng-scss](https://github.com/mediamonks/seng-scss).
This file is also automatically imported in every component SCSS file so you never have to import mixins and variables in your component. 
**Note: Make sure that you never add styling that outputs css because that will be included in every component css file.**

## Autoprefixer

Autoprefixer is also enabled by default. The browserslist can be found and tweaked in the ```package.json```.

## Preview Build

It's also possible to preview a build. You can preview your build by running ```npm run preview``` after a build. 
Because of config differences between development and production it's possible that everything works in developement but not in a production build. 
So it's good to test it on a regular basis to avoid suprises when you go live.

## Modernizr

Modernizr is buildin in vue-skeleton. You can add you feature-detects and options in ```.modernizrrc```. See https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json for all options and feature-detects.

## Polyfills

You can import all required polyfills in ```src/polyfill/index.js```.
Vue-skeleton doesn't include babel-polyfill because it includes a lot of polyfills that are not required anymore.

By default it includes polyfills for the following features:

* Fetch
* Promises
* Array.includes
* Classlist

## Assets

## Locale support

## Config

## Startup






