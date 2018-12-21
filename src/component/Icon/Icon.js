import VueTypes from 'vue-types';

const svgContext = require.context('../../asset/svg/?inline', false, /\.svg/);

// @vue/component
export default {
  name: 'Icon',
  props: {
    name: VueTypes.string.isRequired,
  },
  computed: {
    icon() {
      return svgContext(`./${this.name}.svg`);
    },
  },
};
