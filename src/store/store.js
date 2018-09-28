import Vuex from 'vuex';
import Vue from 'vue';
import modules from './modules';

Vue.use(Vuex);

let store = null;

const getStore = () => {
  if (!store) {
    store = new Vuex.Store({
      modules,
      strict: process.env.NODE_ENV !== 'production',
    });
  }

  return store;
};

export default getStore;
