const namespace = 'user';

export const SET_FIRST_NAME = `${namespace}/setFirstName`;
export const SET_LAST_NAME = `${namespace}/setLastName`;

export const GET_FULL_NAME = `${namespace}/getFullName`;

export default {
  state: {
    firstName: '',
    lastName: '',
  },
  getters: {
    [GET_FULL_NAME]: state => `${state.firstName} ${state.lastName}`,
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
