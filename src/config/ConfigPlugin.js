import configManagerInstance from './configManagerInstance';

export default {
	install(Vue) {
		Object.defineProperty(Vue.prototype, '$config', {
			get() {
				return configManagerInstance;
			},
		});
	},
};
