import Vue from 'vue';
import axios from 'axios';
import VueExposePlugin from 'util/VueExposePlugin';
import { URLNames, PropertyNames, VariableNames } from 'data/enum/configNames';
import PageNames from 'data/enum/PageNames';
import Pages from 'data/enum/Pages';
import { createPath } from 'util/routeUtils';
import Params from 'data/enum/Params';
import { getValue } from 'util/injector';
import { CONFIG_MANAGER, GATEWAY } from 'data/Injectables';

const initPlugins = () => {
	// expose objects to the Vue prototype for easy access in your vue templates and components
	Vue.use(VueExposePlugin, {
		$config: getValue(CONFIG_MANAGER),
		$gateway: getValue(GATEWAY),
		$http: axios,
		URLNames,
		PropertyNames,
		VariableNames,
		PageNames,
		Pages,
		Params,
		createPath,
	});
};

const startUp = () => {
	// Initialise plugins
	initPlugins();

	// Add async methods to the Promise.all array
	return Promise.all([
		Promise.resolve(),
	]);
};

export default startUp;
