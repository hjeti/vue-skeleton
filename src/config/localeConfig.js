import { URLNames, PropertyNames, VariableNames } from 'data/enum/configNames';
import configManagerInstance from './configManagerInstance';

const languages = configManagerInstance.getProperty(PropertyNames.AVAILABLE_LOCALES).map(locale => ({
	code: locale,
	urlPrefix: locale,
	translationKey: locale,
}));

const config = {
	persistent: false,
	defaultCode: configManagerInstance.getProperty(PropertyNames.DEFAULT_LOCALE),
	languages,
};

const proxy = {
	getTranslation({ translationKey }) {
		return fetch(configManagerInstance.getURL(URLNames.LOCALE, { locale: translationKey }), {
			method: 'get',
			credentials: 'same-origin',
			mode: 'cors',
			headers: {
				Accept: 'application/json',
			},
		})
			.then(response => response.json())
			.catch(() => {
				// eslint-disable-next-line no-console
				console.error(`Error loading locale: ${translationKey}`);
			});
	},
};

export default {
	localeEnabled: configManagerInstance.getVariable(VariableNames.LOCALE_ENABLED),
	localeRoutingEnabled: configManagerInstance.getVariable(VariableNames.LOCALE_ROUTING_ENABLED),
	config,
	proxy,
};
