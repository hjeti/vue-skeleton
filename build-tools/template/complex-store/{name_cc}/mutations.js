{{#if mutations}}
import { {{#each mutations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}} } from './{{name_cc}}';
{{/if}}

export default {
	{{#if mutations}}
	{{#each mutations}}
	[{{this}}]: (state, payload) => {
	},
	{{/each}}
	{{/if}}
};
