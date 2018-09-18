{{#if components}}
{{#each components}}
import {{this}} from '../../component/{{this}}';
{{/each}}
{{/if}}
{{#if props}}
import VueTypes from 'vue-types';

{{/if}}
// @vue/component
export default {
  name: '{{name_pc}}',
  {{#if components}}
  components: {
    {{#each components}}
    {{this}},
    {{/each}}
  },
  {{/if}}
  {{#if props}}
  props: {
    {{#each props}}
    {{this}}: VueTypes.any,
    {{/each}}
  },
  {{/if}}
  {{#if lifecycle}}
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  {{/if}}
};
