{{#if mutations}}
{{#each mutations}}
export const {{this}} = '{{camelcase this}}';
{{/each}}
{{/if}}

export default {
	namespaced: true,
	state: {
	},
	getters: {
	},
	mutations: {
		{{#if mutations}}
		{{#each mutations}}
		[{{this}}]: (state, payload) => {
		},
		{{/each}}
		{{/if}}
	},
	actions: {
	},
};
