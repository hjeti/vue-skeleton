# vue-skeleton
A lightweight (~58kb gzipped) Vue skeleton

## Features

* [vuex](https://github.com/vuejs/vuex)
* [vue-router](https://github.com/vuejs/vue-router)
* [vuex-connect](https://github.com/ktsn/vuex-connect)
* [webpack 2](https://github.com/webpack/webpack)
* [SCSS](https://github.com/sass/sass)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [TypeScript](https://github.com/Microsoft/TypeScript)
* [seng-generator](https://github.com/mediamonks/seng-generator)
* [seng-config](https://github.com/mediamonks/seng-config)
* [seng-scss](https://github.com/mediamonks/seng-scss)
* [airbnb coding standard](https://github.com/airbnb/javascript) (integrated with es/ts-lint)
* [modernizr](https://github.com/Modernizr/Modernizr)
* i18n using [i18nManager](https://github.com/MatteoGabriele/vue-i18n-manager)
* versioning
* (build) preview server with gzip
* optional eslint-loader
* optional prepush eslint hook
* svg support
* https support

## Coding

* Every component folder is in PascalCase
* Every component contains an index.js to integrate vuex-connect and for easy import ```import HomePage from 'page/HomePage'```
* Every page name ends with Page
* Always use the PascalCase component name in templates ```<ScrollBar/>```

## Commands

* ```npm run dev```: Starts the dev server
* ```npm run build```: Create a build
* ```npm run preview```: Preview the build in the browser
* ```npm run eslint```: Run eslint
* ```npm run tslint```: Run tslint
* ```npm run svg```: Process and optimize svg for use with the Icon component

## Seng generator templates

Vue skeleton has [seng-generator](https://github.com/mediamonks/seng-generator) templates integrated for easy 
creation of components, pages and store modules.

To use the seng-generator it's mandatory to install it globally.

Run ```npm install seng-generator -g```

After the installation code can be generated using the following templates:
* component (```sg component <name>```) : Creates a component
* connected-component (```sg connected-component <name>```): Creates a component with vuex-connect integrated
* page (```sg page <name>```): Creates a page
* connected-page (```sg connected-page <name>```): Creates a page with vuex-connect integrated
* store (```sg store <name>```): Creates a store module
* store (```sg complex-store <name>```): Creates a complex store module

It's also possible to modify or add templates. Check the [documentation](https://github.com/mediamonks/seng-generator) of seng-generator for more info.

## Using SVGs

It's super easy to use svgs in Vue skeleton.

* Add svgs to the svg folder (```asset/svg```)
* Run ```npm run svg``` to optimize svgs and copy them to the ```src/asset/svg``` folder
* Use them in the Icon component ```<Icon name="check" class="icon-check" />```

The Icon component is globally registered in Vue so it can be used without importing and registering within components.

## SCSS

Vue skeleton uses SCSS for styling. It also uses CSS modules to local scope the styling of components.
Check https://vue-loader.vuejs.org/en/features/css-modules.html for more information.

There are two main SCSS files:

* ```screen.scss``` Application global styling goes here. By default it only imports the normalize.css module.
* ```utils.scss```  Application wide available mixins and variables. By default it imports [seng-scss](https://github.com/mediamonks/seng-scss).
```utils.scss```    Is automatically imported in every component SCSS file.

**Note: Make sure that ```utils.scss``` NEVER outputs CSS. Outputting CSS to ```utils.scss``` will add this CSS to 
every component. **  

## Autoprefixer

Autoprefixer is enabled by default. To configure which browser(s) need prefixing adjust the browser list in the ```
/package.json``` file.

## Preview Build

After creating a new build it's possible to preview it by running the ```npm run preview``` command.
Because of config differences between development and production it's possible that everything works in development but not in a production build.
So it's good to test it on a regular basis to avoid surprises when deploying to an environment.

## Modernizr

Modernizr is built-in the Vue skeleton. The Modernizr configuration is located in the ```/.modernizrrc``` file.
Reference the [Modernizr Configuration](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json) for all
options and feature-detects.

## Polyfills

All required polyfills are imported in the ```src/polyfill/index.js``` file.
Vue skeleton doesn't include babel-polyfill as it includes a lot of polyfills that are not required anymore.

By default it includes polyfills for the following features

* Fetch
* Promises
* Array.includes
* Classlist

## Assets

Assets are an important part of a website so they are also important in Vue skeleton.

There are two kinds of assets:
 
* Static assets
* Assets that are processed by webpack

Assets that need to be processed by webpack are stored in the ```src/asset``` folder.
Examples of those assets are fonts, images, SVGs and SCSS files.

There are two folders for static assets:

* ```static``` This folder is for assets that need to be versioned. Examples are locale jsons, data jsons, videos and dynamically loaded images. 
After a build this folder will end up in the root of the versioned folder (by default: ```version/${timestamp}/static```.
* ```staticRoot``` This folder is for assets that don't need to be versioned. Examples are favicon and share images. 
After a build the content of this folder will end up in a ```static``` folder in the root of the build next to the ```index.html```.

static assets are not processed by webpack. It's mandatory to prefix static paths in code using a variable.
As stated above the versioned static folder is placed in a versioned folder with a timestamp in the path.
It's impossible to know the timestamp during development so the only option is prefixing.

Luckily it's super easy to prefix paths because Vue skeleton provides all the necessary variables:

```javascript
process.env.VERSIONED_STATIC_ROOT
process.env.STATIC_ROOT
```

Prefixing paths using these variables is *important* not using them can result in unresolvable assets during 
development/build.

These variables are available in the config ```src/config/config.js```.
Getting them from the ConfigManager is easy:

```javascript
import configManagerInstance from 'config/configManagerInstance';
import { VariableNames } from 'data/enum/configNames';

const backgroundImage = `${configManagerInstance.getVariable(VariableNames.VERSIONED_STATIC_ROOT)}image/background.png`;
const shareImage = `${configManagerInstance.getVariable(VariableNames.STATIC_ROOT)}image/share.png`;
```

Inside Vue components it's also possible to reference the ConfigManager by using  ```this.$config```:

```javascript
import { VariableNames } from 'data/enum/configNames';

const video = `${this.$config.getVariable(VariableNames.VERSIONED_STATIC_ROOT)}video/intro.mp4`;
```

See Configuration chapter for more information.

## Locale support

The Vue skeleton uses [vue-i18n-manager](https://github.com/MatteoGabriele/vue-i18n-manager) for localization.

Configure it in the config (`src/config/config.js`) and in the locale config (`src/config/localeConfig.js`).

In most cases the standard config should be sufficient. The config has the following variables that determine how and if 
localization is used:

* `VariableNames.LOCALE_ENABLED`: Enable of disable localization
* `VariableNames.LOCALE_ROUTING_ENABLED`: Enable or disable localized routing (/en/home)
* `URLNames.LOCALE`: Path to the locale files by default `${process.env.VERSIONED_STATIC_ROOT}locale/{locale}.json`
* `PropertyNames.DEFAULT_LOCALE`: The default locale
* `PropertyNames.AVAILABLE_LOCALES`: An array with all available locales

The value of the locales (eg. `en-gb`) in the config has to match the JSON filename and will also be present in the 
url if localized routing is enabled. If for example the name of the JSON and the variable in the url needs to be 
different it's possible to change the default implementation in the `localeConfig.js` file.
`localeConfig.js` also contains the proxy that is responsible for loading the locale JSON files. 

Check the [i18nManager  documentation](https://matteogabriele.gitbooks.io/vue-i18n-manager/content/) for usage in components. 

## Configuration

## Startup
Add methods to `control/startUp` that need to be run before app initialisation. The startUp returns a promise allowing
to chain startup tasks.

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
