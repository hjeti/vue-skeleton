

export default {
	name: 'Icon',
	props: {
		name: String,
	},
	computed: {
		icon() {
			// eslint-disable-next-line global-require, import/no-dynamic-require
			return require(`../../asset/svg/${this.name}.svg`);
		},
	},
};
