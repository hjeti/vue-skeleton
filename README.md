# vue-skeleton ![dependencies](https://david-dm.org/hjeti/vue-skeleton.svg)
The Vue skeleton comes standard packaged with a variety of tools for building a multilingual SPA.
The skeleton goal is to get up to speed quickly without tinkering hours with configuration.

The whole skeleton when build is **only ~58kb** gzipped!


# Table of Contents
1. [Features](#features)
2. [Code/Folder conventions](#codefolder-conventions)
3. [NPM Commands](#npm-commands)
4. [Seng generator templates](#seng-generator-templates)
5. [Configuration](#configuration)
	1. [Webpack configuration](#webpack-configuration)
	2. [Project configuration](#project-configuration)
	3. [Site configuration](#site-configuration)
6. [Using SVGs](#using-svgs)
7. [SCSS](#scss)
8. [Autoprefixer](#autoprefixer)
9. [Modernizr](#modernizr)
10. [Asset management](#asset-management)
11. [Previewing a build](#previewing-a-build)
12. [Polyfill configuration](#polyfill-configuration)
13. [Localization support](#localization-support)
14. [Application startup](#application-startup)
15. [Pre-push hooks](#pre-push-hooks)

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
* (build) preview server (gzip enabled)
* optional es/ts-lint loader
* optional prepush es/ts-lint hooks
* SVG support
* https support

## Code/Folder conventions

* Every component folder is formatted in PascalCase
* Every component contains an index.js to integrate vuex-connect and for easy import ```import HomePage from 'page/HomePage'```
* Every page name is appended with Page
* Always use the PascalCase formatting for components in templates ```<ScrollBar/>```

## NPM Commands

* ```npm run dev```: Starts the development server
* ```npm run build```: Creates a build
* ```npm run preview```: Previews the latest build in the browser
* ```npm run eslint```: Runs eslint
* ```npm run tslint```: Runs tslint
* ```npm run svg```: Process and optimize SVGs for use with the Icon component

When using [yarn](https://yarnpkg.com) just replace ```npm run``` commands with ```yarn```.

## Seng generator templates

Vue skeleton comes with [seng-generator](https://github.com/mediamonks/seng-generator) predefined templates and
configuration which is used to scaffold components, pages and store modules.

Global installation of [seng-generator](https://github.com/mediamonks/seng-generator) is mandatory.
To install it globally run the following command:

```npm install seng-generator -g```

After installation the following scaffolding commands are available:
* component (```sg component <name>```) : Creates a component
* connected-component (```sg connected-component <name>```): Creates a component with vuex-connect integrated
* page (```sg page <name>```): Creates a page
* connected-page (```sg connected-page <name>```): Creates a page with vuex-connect integrated
* store (```sg store <name>```): Creates a store module
* complex-store (```sg complex-store <name>```): Creates a complex store module

Check the [seng-generator](https://github.com/mediamonks/seng-generator) [documentation](https://github.com/mediamonks/seng-generator) for detailed information about modifying or adding templates.

## Configuration

There are 3 configurations in Vue skeleton.

#### Webpack configuration

The webpack configuration is located in the `build` folder. It consists of a base (`webpack.base.conf.js`) that
contains all the configuration that is shared between
development (`webpack.dev.conf.js`) and production (`webpack.prod.conf.js`). To avoid config duplication there is a `webpackHelpers`
file with some helpers that return the right config context for development and production. Webpack is completely
configured out of the box. But there is always room for customization.

#### Project configuration

The project config is located in the `config` folder. The project config contains variables that are used by webpack
like the environment variables, location of the index file and the version path. If the site is running in a
subfolder on the server it's possible to change the publicpath to avoid problems.

This file contains some other non webpack related settings. The settings make it possible to enable or disable eslint
 and tslint loader, configururation of prepush tasks
and the option to enable https during development.

#### Site configuration

In development there needs to be a place to store urls of APIs like the facebook app id etc. Vue skeleton uses
seng-config because it has straightforward API and comes packed with a lot of features.
It has support for properties, urls and variables and environments. The latter is very important because most of the config is environment based.
Seng-config environments can extend each other for easy configuration.

All the app configuration related files are stored in `src/config`:

* `config.js`: Contains the config and the environment logic. The environment is set based on the host.
* `configManagerInstance.js`: The instance of the ConfigManger that is used to retrieve all the config from `config.js`. Check the [documentation](https://rawgit.com/MediaMonks/seng-config/master/doc/typedoc/classes/_lib_configmanager_.configmanager.html) for all available methods.
* `localeConfig.js`: Contains the locale config.

## Using SVGs

It is super easy to use SVGs in Vue skeleton.

* Add SVGs to the following folder ```asset/svg```
* Run ```npm run svg``` to optimize SVGs and copy them to the ```src/asset/svg``` folder
* Use them in the Icon component ```<Icon name="check" class="icon-check" />```

The Icon component is globally registered in Vue allowing it to be used directly without importing and registering
within Vue components.

## SCSS

Vue skeleton uses SCSS for styling. It uses CSS modules to local scope the styling of Vue components.
Check [CSS Modules](https://vue-loader.vuejs.org/en/features/css-modules.html) for more information.

There are two main SCSS files:

* ```screen.scss``` Application global styling goes here. By default it only imports the normalize.css module.
* ```utils.scss```  Application wide available mixins and variables. By default it imports [seng-scss](https://github.com/mediamonks/seng-scss).

```utils.scss```    Automatically imported in every component SCSS file.

**Note: Make sure that ```utils.scss``` NEVER outputs CSS. Outputting CSS to ```utils.scss``` will add this CSS to
every component.**

## Autoprefixer

Autoprefixer is enabled by default. To configure which browser(s) need prefixing adjust the browser list in the ```
/package.json``` file.

## Modernizr

Modernizr is built-in the Vue skeleton. The Modernizr configuration is located in the ```/.modernizrrc``` file.
Reference the [Modernizr Configuration](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json) for all
options and feature-detects.

## Asset management

Managing and working with assets is important. The Vue skeleton comes with a hassle-free solution for managing assets.

There are two kinds of assets:

* Static assets
* Assets that are processed by webpack

Assets that need to be processed by webpack are stored in the ```src/asset``` folder.
Examples of those assets are fonts, images, SVGs and SCSS files.

There are two folders for static assets:

* ```static``` This folder is for assets that need to be versioned. Examples: locale JSONs, data JSONs, videos and images.
After a build this folder will end up in the **root of the versioned folder** (by default:
```version/${timestamp}/static```.
* ```staticRoot``` This folder is for assets that don't need to be versioned. Examples: favicon and share images.
After a build the content is copied over in a ```static``` folder in the **root of the build** next to the ```index
.html```.

static assets won't be processed by webpack (e.g. manually file optimization). It is mandatory to prefix static paths in code using a variable.
As stated above the versioned static folder is placed in a versioned folder with a timestamp in the path.
It's impossible to know the timestamp during development the only option is to prefix assets.

Luckily it's super easy to prefix paths because Vue skeleton provides all the necessary variables:

```javascript
process.env.VERSIONED_STATIC_ROOT
process.env.STATIC_ROOT
```

**Prefixing paths** using these variables **is important** not using them can result in unresolvable assets during
development/build.

These variables are available in the config ```src/config/config.js``` and getting them using the ConfigManager is easy:

```javascript
import configManagerInstance from 'config/configManagerInstance';
import { VariableNames } from 'data/enum/configNames';

const backgroundImage = `${configManagerInstance.getVariable(VariableNames.VERSIONED_STATIC_ROOT)}image/background.png`;
const shareImage = `${configManagerInstance.getVariable(VariableNames.STATIC_ROOT)}image/share.png`;
```

Inside a Vue component it's also possible to reference the ConfigManager by using  ```this.$config```:

```javascript
import { VariableNames } from 'data/enum/configNames';

const video = `${this.$config.getVariable(VariableNames.VERSIONED_STATIC_ROOT)}video/intro.mp4`;
```

Reference the [configuration chapter](#configuration) for more information.

## Previewing a build

After creating a new build it is possible to preview it by running the ```npm run preview``` command.
Due to config differences between development and production it may occur that it runs perfectly fine on development
but not in a production build.
It is good to test builds on a regular basis to avoid issues when deploying to an environment.

## Polyfill configuration

All required polyfills are imported in the ```src/polyfill/index.js``` file.
Vue skeleton has custom list of polyfills and does not use babel-polyfill as it includes a lot of legacy polyfills.

By default it includes polyfills for the following features

* Fetch
* Promises
* Array.includes
* Classlist

## Localization support

The Vue skeleton is packaged with [vue-i18n-manager](https://github.com/MatteoGabriele/vue-i18n-manager) for localization.

Configuration can be changed in the project config (`src/config/config.js`) and in the locale config
(`src/config/localeConfig.js`).

In most cases the standard config should be sufficient. The config has the following variables that determine how and if
localization is used:

* `VariableNames.LOCALE_ENABLED`: Enable/Disable localization
* `VariableNames.LOCALE_ROUTING_ENABLED`: Enable/Disable localized routing (/en/home)
* `URLNames.LOCALE`: Path to the locale files (Defaults to `${process.env.VERSIONED_STATIC_ROOT}locale/{locale}.json`)
* `PropertyNames.DEFAULT_LOCALE`: The default locale
* `PropertyNames.AVAILABLE_LOCALES`: An array with all available locales

The value of the locales can be an object that i18n-manager accepts or a string. A string value (eg. `en-gb`) in the config has to match the JSON filename and will also be present in the
url if localized routing is enabled.

`localeConfig.js` manages the config of the i18n manager. It also contains the proxy that is responsible for loading the locale JSON files.
Change the proxy if a custom implementation is required.

Check the [i18nManager  documentation](https://matteogabriele.gitbooks.io/vue-i18n-manager/content/) for usage within Vue components.

## Application startup
Add methods to `control/startUp` that need to be run before app initialisation. The startUp returns a promise allowing
to chain startup tasks.

Examples of startup tasks:
- Registering/Initialisation of Vue plugins
- Requesting async initialisation data

## Pre-push hooks
Before pushing to a repository it's possible to run tasks to abort a push. If an another task needs to run before
pushing add them in `bin/prePush.js` file.

Standard pre-push tasks enabled
- esLintCheck
- tsLintCheck

Disabling or enabling task can be done in `config/index.js` by changing the `prePush` property contents.
Removing the `prePush` property or emptying the array will disable pre-push hooks.
