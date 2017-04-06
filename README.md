# vue-skeleton
A lightweight (~58kb gzipped) Vue skeleton

## Features

* vuex
* vue-router
* vuex-connect
* webpack 2
* SCSS
* CSS Modules
* versioning
* Typescript support
* seng-generator
* seng-config
* seng-scss
* airbnb coding standard integrated using es/tslint
* (build) preview server with gzip
* modernizr
* optional es/tslint-loader
* optional prepush eslint hook
* svg support
* https support
* i18n

## Coding

* Every component folder is in PascalCase
* Every component contains an index.js to integrate vuex-connect and for easy import ```import HomePage from 'page/HomePage'```
* Every page name ends with Page
* Always use the PascalCase component name in your templates ```<ScrollBar/>```

## Commands

* ```npm run dev```: Starts the dev server
* ```npm run build```: Create a build
* ```npm run preview```: Preview the build in the browser
* ```npm run eslint```: Run eslint
* ```npm run tslint```: Run tslint
* ```npm run svg```: Process and optimize svg for use with the Icon component

## Seng generator templates

Vue-skeleton has [seng-generator](https://github.com/mediamonks/seng-generator) templates integrated for easy creation of components, pages and store modules.

Before you can use seng-generator you have to install it globally.

Run ```npm install seng-generator -g```

After the installation you can generate code based on the following templates:
* component (```sg component <name>```) : Creates a component
* connected-component (```sg connected-component <name>```): Creates a component with vuex-connect integrated
* page (```sg page <name>```): Creates a page
* connected-page (```sg connected-page <name>```): Creates a page with vuex-connect integrated
* store (```sg store <name>```): Creates a store module
* store (```sg complex-store <name>```): Creates a complex store module

It's also possible to modify or add templates. Check the [documentation](https://github.com/mediamonks/seng-generator) of seng-generator for more info.

## SVG

It's super easy to use svgs in vue-skeleton.

* Add your svgs to the svg folder (```asset/svg```)
* Run ```npm run svg``` to optimize your svgs and copy them to the ```src/asset/svg``` folder
* Use them in the Icon component ```<Icon name="check" class="icon-check" />```

The Icon component is globally registered in Vue so you can use it without importing and registering it in your components.

## SCSS

Vue-skeleton uses SCSS for styling. It also uses CSS modules to local scope the styling of your components.
Check https://vue-loader.vuejs.org/en/features/css-modules.html for more information.

There are two main SCSS files:

* ```screen.scss``` is the SCSS file for all your global styling. By default it only imports the normalize.css module.
* ```utils.scss``` is the SCSS file for all the mixins and variables. By default it imports [seng-scss](https://github.com/mediamonks/seng-scss).
```utils.scss``` is also automatically imported in every component SCSS file so you never have to import mixins and variables in your component.
**Note: Make sure that you never add styling that outputs css because that will be included in every component css file.**

## Autoprefixer

Autoprefixer is also enabled by default. The browserslist can be found and tweaked in the ```package.json```.

## Preview Build

It's also possible to preview a build. You can preview your build by running ```npm run preview``` after a build.
Because of config differences between development and production it's possible that everything works in development but not in a production build.
So it's good to test it on a regular basis to avoid surprises when deploying to an environment.

## Modernizr

Modernizr is built-in the vue-skeleton. You can add your feature-detects and options in ```.modernizrrc```.
Reference the [Modernizr Configuration](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json) for all
options and feature-detects.

## Polyfills

You can import all required polyfills in ```src/polyfill/index.js```.
Vue-skeleton doesn't include babel-polyfill because it includes a lot of polyfills that are not required anymore.

By default it includes polyfills for the following features:

* Fetch
* Promises
* Array.includes
* Classlist

## Assets

Assets are an important part of a website so they are also important in vue-skeleton.

There are two kinds of assets:
 
* Static assets
* Assets that are processed by webpack

You should add your assets that are processed by webpack in the ```src/asset``` folder.
Examples of those assets are fonts, images, svgs and scss files.

There are two folders for static assets:

* ```static``` This folder is for assets that need to be versioned. Examples are locale jsons, data jsons, videos and dynamically loaded images. 
After a build this folder will end up in the root of the versioned folder (by default: ```version/${timestamp}/static```.
* ```staticRoot``` This folder is for assets that don't need to be versioned. Examples are favicon and share images. 
After a build the content of this folder will end up in a ```static``` folder in the root of the build next to the ```index.html```.

Because static assets are not processed by webpack you need to prefix your static paths in your code with a variable.
As stated above the versioned static folder is placed in a versioned folder with a timestamp in the path.
It's impossible to know the timestamp during development so the only option is prefixing.

Luckily it's super easy to prefix your paths because vue-skeleton provides all the necessary variables:

```javascript
process.env.VERSIONED_STATIC_ROOT
process.env.STATIC_ROOT
```

If you prefix your paths with those variables you don't run into problems during development and after a build.

Those variables are also set in the config ```src/config/config.js```. 
So you can also get them from the ConfigManager:

```javascript
import configManagerInstance from 'config/configManagerInstance';
import { VariableNames } from 'data/enum/configNames';

const backgroundImage = `${configManagerInstance.getVariable(VariableNames.VERSIONED_STATIC_ROOT)}image/background.png`;
const shareImage = `${configManagerInstance.getVariable(VariableNames.STATIC_ROOT)}image/share.png`;
```

Inside your Vue components you can also use the ConfigPlugin that makes the ConfigManager available as ```this.$config```:

```javascript
import { VariableNames } from 'data/enum/configNames';

const video = `${this.$config.getVariable(VariableNames.VERSIONED_STATIC_ROOT)}video/intro.mp4`;
```

See Config chapter for more information.

## Locale support

Vue-skeleton uses [vue-i18n-manager](https://github.com/MatteoGabriele/vue-i18n-manager) for localization.

You can configure it in the config (`src/config/config.js`) and in the locale config (`src/config/localeConfig.js`).

In most cases you only need the normal config. The config has the following variables that determine how and if localization is used in a website:

* `VariableNames.LOCALE_ENABLED`: Enable of disable localization
* `VariableNames.LOCALE_ROUTING_ENABLED`: Enable or disable localized routing (/en/home)
* `URLNames.LOCALE`: Path to the locale files by default `${process.env.VERSIONED_STATIC_ROOT}locale/{locale}.json`
* `PropertyNames.DEFAULT_LOCALE`: The default locale
* `PropertyNames.AVAILABLE_LOCALES`: An array with all available locales

The value of the locales (eg. `en-gb`) in the config has to match the json filename and will also be present in the url if localized routing is enabled. If for example the name of the json and the variable in the url needs to be different you can change the default implementation in the `localeConfig.js`.
`localeConfig.js` also contains the proxy that is responsible for loading the locale jsons. 

Check the [documentation](https://matteogabriele.gitbooks.io/vue-i18n-manager/content/) if you want to know how to use the i18n-manager in your components. 

## Config

## Startup
Add methods to `control/startUp` that need to be run before app initialisation. The startUp returns a promise allowing
to chain your startup tasks.

Examples of startup tasks:
- Registering/Initialisation of Vue plugins
- Requesting async initialisation data

## Pre-push hooks
Before pushing to a repository you can run tasks to abort a push. If an another task needs to be run before 
pushing add them in `bin/prePush.js` file.

Standard pre-push tasks enabled
- esLintCheck
- tsLintCheck

Disabling or enabling task can be done in `config/index.js` by changing the `prePush` property contents.
