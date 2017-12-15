export const SET_FIRST_NAME = 'setFirstName';
export const SET_LAST_NAME = 'setLastName';

export default {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
  },
  getters: {
    fullName: state => `${state.firstName} ${state.lastName}`,
  },
  mutations: {
    [SET_FIRST_NAME]: (state, payload) => {
      state.firstName = payload;
    },
    [SET_LAST_NAME]: (state, payload) => {
      state.lastName = payload;
    },
  },
  actions: {},
};
