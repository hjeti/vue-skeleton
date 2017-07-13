import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

{{#if mutations}}
{{#each mutations}}
export const {{this}} = '{{camelcase this}}';
{{/each}}
{{/if}}

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions,
};
