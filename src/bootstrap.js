// import styles
import 'style/screen.scss';
import 'svg';
import 'modernizr';

import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import filter from 'filter';
import directive from 'directive';
import component from 'component';
import router from 'router';
import store from 'store';
import svgicon from 'vue-svgicon';

import App from './App';

// import polyfills
import './polyfill';


// register filters globally
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

// register directives globally
Object.keys(directive).forEach(key => Vue.directive(key, directive[key]));

// register components globally
Object.keys(component).forEach(key => Vue.component(key, component[key]));

// sync router data to store
sync(store, router);

Vue.use(svgicon, {
	tagName: 'Icon',
});

const app = new Vue({
	...App,
	router,
	store,
});

app.$mount('#app');
