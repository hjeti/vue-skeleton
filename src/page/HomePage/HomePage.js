import { URLNames } from 'data/enum/configNames';

export default {
	name: 'HomePage',
	mounted() {
		fetch(`${this.$config.getURL(URLNames.API)}v3.1/countries?type=web`)
			.then(response => response.json())
			.then(response => console.log(response))
			.catch((error) => {
				console.log(error);
			});
	},
};
