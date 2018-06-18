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
