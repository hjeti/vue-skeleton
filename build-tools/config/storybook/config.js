import { configure } from '@storybook/vue';
import 'polyfill';
import 'asset/style/screen.scss';
import 'modernizr';
import 'settings';

import Vue from 'vue';
import Vuex from 'vuex';
import component from 'component';
import filter from 'filter';
import directive from 'directive';
import setupInjects from 'util/setupInjects';
import VueI18nManager from 'vue-i18n-manager';
import localeLoader from 'util/localeLoader';
import getLocaleConfig from 'config/localeConfig';
import getStore from 'store';
import { PropertyNames, URLNames, VariableNames } from 'data/enum/configNames';
import axios from 'axios/index';
import Params from 'data/enum/Params';
import VueExposePlugin from 'util/VueExposePlugin';
import RouteNames from 'data/enum/RouteNames';
import RoutePaths from 'data/enum/RoutePaths';
import { getValue } from 'util/injector';
import { CONFIG_MANAGER, GATEWAY } from 'data/Injectables';
import { createPath } from 'util/routeUtils';

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
