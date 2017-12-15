import 'polyfill';
import 'asset/style/screen.scss';
import 'modernizr';
import 'settings';

import Vue from 'vue';
import filter from 'filter';
import directive from 'directive';
import component from 'component';
import getRouter from 'router';
import getStore from 'store';
import startUp from 'control/startUp';
import getLocaleConfig from 'config/localeConfig';
import VueI18nManager from 'vue-i18n-manager';
import { sync } from 'vuex-router-sync';
import setupInjects from 'util/setupInjects';
import localeLoader from 'util/localeLoader';
import App from 'App';

// register filters globally
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

// register directives globally
Object.keys(directive).forEach(key => Vue.directive(key, directive[key]));

// register components globally
Object.keys(component).forEach(key => Vue.component(key, component[key]));

setupInjects();

if (window.webpackPublicPath) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.webpackPublicPath;
}

const router = getRouter();
const store = getStore();
const localeConfig = getLocaleConfig();

if (localeConfig.localeEnabled) {
  Vue.use(VueI18nManager, {
    store,
    router,
    config: localeConfig.config,
    proxy: localeLoader,
  });

  Vue.initI18nManager();
}

// sync router data to store
sync(store, router);

// Init new vue app
const app = new Vue({
  router,
  store,
  render: createElement => createElement(App),
});

// Mount the app after startUp
startUp(store).then(() => app.$mount('#app'));
