import { VariableNames } from '../../data/enum/configNames';

export default {
	name: 'HomePage',
	mounted() {
		console.log(this.$config.getVariable(VariableNames.LOCALE_ENABLED));
	},
};
