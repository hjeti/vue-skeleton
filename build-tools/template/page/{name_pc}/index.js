{{#if connected}}
import { connect } from 'vuex-connect';
{{/if}}
import {{name_pc}} from './{{name_pc}}';

{{#if connected}}
export default connect({
	stateToProps: {
	},
	mutationsToProps: {
	},
	actionsToProps: {
	},
	gettersToProps: {
	},
	lifecycle: {
	},
})({{name_pc}}.name, {{name_pc}});
{{else}}
export default {{name_pc}};
{{/if}}

