export default {
  install(Vue, options) {
    Object.keys(options).forEach(key => {
      if (Vue.prototype[key]) {
        // eslint-disable-next-line no-console
        console.error(`Skipping ${key}. ${key} already exists on the Vue prototype`);
      } else {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return options[key];
          },
        });
      }
    });
  },
};
