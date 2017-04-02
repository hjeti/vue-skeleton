import icons from 'asset/svg';

export default {
	name: 'Icon',
	props: {
		name: {
			validator(value) {
				return !!icons[value];
			},
		},
	},
	computed: {
		icon() {
			return icons[this.name];
		},
	},
};
