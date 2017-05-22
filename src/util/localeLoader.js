import axios from 'axios';
import { URLNames } from 'data/enum/configNames';
import { getValue } from 'util/injector';
import { CONFIG_MANAGER } from 'data/Injectables';

const loadedLanguages = [];
let loadCallback;

export default {
	isLoaded(locale) {
		return loadedLanguages.includes(locale);
	},
	setLoadCallback(callback) {
		loadCallback = callback;
	},
	getTranslation(locale) {
		return axios.get(getValue(CONFIG_MANAGER).getURL(URLNames.LOCALE, { locale: locale.translationKey }), {
			headers: {
				Accept: 'application/json',
			},
		})
			.then((response) => {
				loadedLanguages.push(locale.code);

				if (loadCallback) {
					loadCallback(locale.code);
				}

				return response.data;
			})
			.catch(() => {
				// eslint-disable-next-line no-console
				console.error(`Error loading locale: ${locale.translationKey}`);
			});
	},
};
