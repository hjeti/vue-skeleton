import 'asset/style/screen.scss';
import 'modernizr';
import 'polyfill';

import Vue from 'vue';
import filter from 'filter';
import directive from 'directive';
import component from 'component';
import router from 'router';
import store from 'store';
import startUp from 'control/startUp';

// register filters globally
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]));

// register directives globally
Object.keys(directive).forEach(key => Vue.directive(key, directive[key]));

// register components globally
Object.keys(component).forEach(key => Vue.component(key, component[key]));

// Mount the app after startUp
startUp(router, store).then(app => app.$mount('#app'));
