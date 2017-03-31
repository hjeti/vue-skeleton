import VueRouter from 'vue-router';
import Vue from 'vue';
import { routeParser } from 'vue-i18n-manager';
import configManagerInstance from 'config/configManagerInstance';
import { PropertyNames } from 'data/enum/configNames';

import routes from './routes';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	routes: routeParser(routes, configManagerInstance.getProperty(PropertyNames.DEFAULT_LOCALE)),
});

export default router;
