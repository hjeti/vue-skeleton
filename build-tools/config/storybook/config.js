import { configure } from '@storybook/vue';
import '../../../src/polyfill';
import '../../../src/asset/style/screen.scss';
import 'modernizr';
import '../../../src/settings';

import Vue from 'vue';
import Vuex from 'vuex';
import component from '../../../src/component';
import filter from '../../../src/filter';
import directive from '../../../src/directive';
import setupInjects from '../../../src/util/setupInjects';
import VueI18nManager from 'vue-i18n-manager';
import localeLoader from '../../../src/util/localeLoader';
import getLocaleConfig from '../../../src/config/localeConfig';
import getStore from '../../../src/store';
import { PropertyNames, URLNames, VariableNames } from '../../../src/data/enum/configNames';
import axios from 'axios';
import Params from '../../../src/data/enum/Params';
import VueExposePlugin from '../../../src/util/VueExposePlugin';
import RouteNames from '../../../src/data/enum/RouteNames';
import RoutePaths from '../../../src/data/enum/RoutePaths';
import { getValue } from '../../../src/util/injector';
import { CONFIG_MANAGER, GATEWAY } from '../../../src/data/Injectables';
import { createPath } from '../../../src/util/routeUtils';

// register filters globally
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

// register directives globally
Object.keys(directive).forEach(key => Vue.directive(key, directive[key]));

// register components globally
Object.keys(component).forEach(key => Vue.component(key, component[key]));

setupInjects();

// Install Vue plugins.
Vue.use(Vuex);

const store = getStore();
const localeConfig = getLocaleConfig();
const configManager = getValue(CONFIG_MANAGER);

Vue.use(VueExposePlugin, {
  $config: configManager,
  $gateway: getValue(GATEWAY),
  $http: axios,
  $versionRoot: configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT),
  $staticRoot: configManager.getVariable(VariableNames.STATIC_ROOT),
  URLNames,
  PropertyNames,
  VariableNames,
  RouteNames,
  RoutePaths,
  Params,
  createPath,
});

if (localeConfig.localeEnabled) {
  Vue.use(VueI18nManager, {
    store,
    router: null,
    config: localeConfig.config,
    proxy: localeLoader,
  });

  Vue.initI18nManager();
}

const req = require.context('../../../stories/', true, /\.stories\.js?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
