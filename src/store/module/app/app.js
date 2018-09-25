const namespace = 'app';

export const SET_DEVICE_STATE = `${namespace}/setDeviceState`;

export default {
  state: {
    deviceState: null,
  },
  getters: {},
  mutations: {
    [SET_DEVICE_STATE](state, deviceState) {
      state.deviceState = deviceState;
    },
  },
  actions: {},
};
