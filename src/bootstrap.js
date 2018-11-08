import 'modernizr';
import Vue from 'vue';
import VueI18nManager from 'vue-i18n-manager';
import { sync } from 'vuex-router-sync';
import './asset/style/screen.scss';
import './settings/settings';
import directive from './directive/directive';
import component from './component/component';
import router from './router/router';
import store from './store/store';
import startUp from './control/startUp';
import localeConfig from './config/localeConfig';
import localeLoader from './util/localeLoader';
import filter from './filter/filter';
import App from './App';

// register filters globally
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

// register directives globally
Object.keys(directive).forEach(key => Vue.directive(key, directive[key]));

// register components globally
Object.keys(component).forEach(key => Vue.component(key, component[key]));

if (window.webpackPublicPath) {
  // eslint-disable-next-line
  __webpack_public_path__ = window.webpackPublicPath;
}

if (localeConfig.localeEnabled) {
  Vue.use(VueI18nManager, {
    store,
    router: localeConfig.localeRoutingEnabled ? router : null,
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
