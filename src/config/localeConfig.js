import axios from 'axios';
import { URLNames, PropertyNames, VariableNames } from 'data/enum/configNames';
import configManagerInstance from './configManagerInstance';

const getLocaleConfig = () => {
	const languages = configManagerInstance.getProperty(PropertyNames.AVAILABLE_LOCALES).map((locale) => {
		if (typeof locale === 'string')	{
			return {
				code: locale,
				urlPrefix: locale,
				translationKey: locale,
			};
		}
		return locale;
	});

	const config = {
		persistent: false,
		defaultCode: configManagerInstance.getProperty(PropertyNames.DEFAULT_LOCALE),
		languages,
	};

	const proxy = {
		getTranslation({ translationKey }) {
			return axios.get(configManagerInstance.getURL(URLNames.LOCALE, { locale: translationKey }), {
				headers: {
					Accept: 'application/json',
				},
			})
				.then(response => response.data)
				.catch(() => {
					// eslint-disable-next-line no-console
					console.error(`Error loading locale: ${translationKey}`);
				});
		},
	};

	return {
		localeEnabled: configManagerInstance.getVariable(VariableNames.LOCALE_ENABLED),
		localeRoutingEnabled: configManagerInstance.getVariable(VariableNames.LOCALE_ROUTING_ENABLED),
		config,
		proxy,
	};
};

export default getLocaleConfig;
