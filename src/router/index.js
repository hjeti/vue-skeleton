import VueRouter from 'vue-router';
import Vue from 'vue';
import { routeParser } from 'vue-i18n-manager';
import configManagerInstance from 'config/configManagerInstance';
import { PropertyNames, VariableNames } from 'data/enum/configNames';
import getLocaleConfig from 'config/localeConfig';

import routes from './routes';

export default function getRouter() {
	Vue.use(VueRouter);

	const localeConfig = getLocaleConfig();

	const processedRoutes = localeConfig.localeEnabled && localeConfig.localeRoutingEnabled ?
		routeParser(routes, configManagerInstance.getProperty(PropertyNames.DEFAULT_LOCALE)) : routes.concat({
			path: '*',
			redirect: '/',
		});

	const router = new VueRouter({
		mode: 'history',
		routes: processedRoutes,
		base: configManagerInstance.getVariable(VariableNames.PUBLIC_PATH),
	});

	return router;
}
