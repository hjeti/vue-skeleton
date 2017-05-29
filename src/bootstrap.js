import 'polyfill';
import 'asset/style/screen.scss';
import 'modernizr';
import 'settings';

import Vue from 'vue';
import filter from 'filter';
import directive from 'directive';
import component from 'component';
import setupRouter from 'router';
import setupStore from 'store';
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

const router = setupRouter();
const store = setupStore();
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
	render: h => h(App),
});

// Mount the app after startUp
startUp(store).then(() => app.$mount('#app'));
