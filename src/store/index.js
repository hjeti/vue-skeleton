import Vuex from 'vuex';
import Vue from 'vue';
import modules from './modules';

const getStore = () => {
	Vue.use(Vuex);

	const store = new Vuex.Store({
		modules,
		strict: process.env.NODE_ENV !== 'production',
	});

	return store;
};

export default getStore;
