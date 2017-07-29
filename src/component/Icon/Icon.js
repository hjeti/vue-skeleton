export default {
	name: 'Icon',
	props: {
		name: String,
	},

	computed: {
		fileName() {
			return `./${this.name}.svg`;
		},
	},

	data: () => ({
		icon: null,
	}),

	beforeCreate() {
		// As we cannot generate this string on compile time you can use the following gist:
		// https://gist.github.com/jesse-mm/34a73df1390ec6715055af08fe44e630

		this.requireContext = require.context(
			// eslint-disable-next-line max-len
			'!!bundle-loader?{"lazy":true,"name":"app"}!svg-inline-loader!svgo-loader?{"plugins":[{"removeStyleElement":true},{"removeComments":true},{"removeDesc":true},{"removeUselessDefs":true},{"removeTitle":true},{"removeMetadata":true},{"removeComments":true},{"cleanupIDs":{"remove":true,"prefix":""}},{"convertColors":{"shorthex":false}}]!asset/svg',
			true,
			/\.svg$/,
		);
	},

	mounted() {
		this.requireContext(this.fileName)((svgData) => {
			this.icon = svgData;
		});
	},
};
