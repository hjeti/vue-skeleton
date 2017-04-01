import 'asset/style/screen.scss';
import 'asset/svg';
import 'modernizr';
import 'polyfill';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import filter from 'filter';
import directive from 'directive';
import component from 'component';
import router from 'router';
import store from 'store';
import svgicon from 'vue-svgicon';
import VueI18nManager from 'vue-i18n-manager';
import localeConfig from 'config/localeConfig';
import ConfigPlugin from 'config/ConfigPlugin';
import startUp from 'control/startUp';

import App from 'App';

// register filters globally
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

// register directives globally
Object.keys(directive).forEach(key => Vue.directive(key, directive[key]));

// register components globally
Object.keys(component).forEach(key => Vue.component(key, component[key]));

Vue.use(svgicon, {
	tagName: 'Icon',
});

if (localeConfig.localeEnabled) {
	Vue.use(VueI18nManager, {
		store,
		router,
		config: localeConfig.config,
		proxy: localeConfig.proxy,
	});

	Vue.initI18nManager();
}

Vue.use(ConfigPlugin);

// sync router data to store
sync(store, router);

const app = new Vue({
	...App,
	router,
	store,
});

startUp().then(() => {
	app.$mount('#app');
});

