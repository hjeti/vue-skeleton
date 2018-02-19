import VueTypes from 'vue-types';

// @vue/component
export default {
  name: 'Icon',
  props: {
    name: VueTypes.string.isRequired,
  },
  computed: {
    icon() {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`asset/svg/${this.name}.svg`);
    },
  },
};
