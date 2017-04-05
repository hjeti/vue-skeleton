import Vue from 'vue';
import ConfigPlugin from 'config/ConfigPlugin';

const initPlugins = () => {
	// Plugin to reference the configManager using vm.$config
	Vue.use(ConfigPlugin);

	// enable if you want to use axios
	// Vue.use(VueAxios, axios);
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
