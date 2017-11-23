{{#if mutations}}
import {{name_cc}}, { {{#each mutations}}{{this}}{{#unless @last}}, {{/unless}}{{/each}} } from './{{name_cc}}';
{{else}}
import {{name_cc}} from './{{name_cc}}';
{{/if}}

export const {{name_pc}}Namespace = '{{name_cc}}';

export const {{name_pc}}MutationTypes = {
	{{#if mutations}}
	{{#each mutations}}
	{{this}}: `{{prepend (append ../name_pc "Namespace}") "${"}}/{{prepend (append this "}") "${"}}`,
	{{/each}}
	{{/if}}
};

export default {{name_cc}};
