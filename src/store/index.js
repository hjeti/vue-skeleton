import Vuex from 'vuex';
import Vue from 'vue';
import modules from './modules';

const setupStore = () => {
	Vue.use(Vuex);

	const store = new Vuex.Store({
		modules,
		strict: process.env.NODE_ENV !== 'production',
	});

	return store;
};

export default setupStore;
