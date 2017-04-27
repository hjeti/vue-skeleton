import Vuex from 'vuex';
import Vue from 'vue';
import modules from './modules';

export default function getStore() {
	Vue.use(Vuex);

	const store = new Vuex.Store({
		modules,
		strict: process.env.NODE_ENV !== 'production',
	});

	return store;
}
