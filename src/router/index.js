import VueRouter from 'vue-router';
import Vue from 'vue';
import { routeParser } from 'vue-i18n-manager';
import { PropertyNames, VariableNames } from 'data/enum/configNames';
import getLocaleConfig from 'config/localeConfig';
import { CONFIG_MANAGER } from 'data/Injectables';
import { getValue } from 'util/injector';

import routes from './routes';

Vue.use(VueRouter);

const setupRouter = () => {
	const localeConfig = getLocaleConfig();
	const configManager = getValue(CONFIG_MANAGER);

	const processedRoutes = localeConfig.localeEnabled && localeConfig.localeRoutingEnabled ?
		routeParser(routes, configManager.getProperty(PropertyNames.DEFAULT_LOCALE)) : routes.concat({
			path: '*',
			redirect: '/',
		});

	const router = new VueRouter({
		mode: 'history',
		routes: processedRoutes,
		base: configManager.getVariable(VariableNames.PUBLIC_PATH),
	});

	return router;
};

export default setupRouter;
