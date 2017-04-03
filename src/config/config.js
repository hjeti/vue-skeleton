import { EnvironmentNames, PropertyNames, URLNames, VariableNames } from 'data/enum/configNames';

const config = {
	environments: {
		[EnvironmentNames.PRODUCTION]: {
			variables: {},
			urls: {},
		},
		[EnvironmentNames.STAGING]: {
			extends: EnvironmentNames.PRODUCTION,
			variables: {},
			urls: {},
		},
		[EnvironmentNames.DEVELOPMENT]: {
			extends: EnvironmentNames.STAGING,
			variables: {},
			urls: {},
		},
		[EnvironmentNames.LOCAL]: {
			extends: EnvironmentNames.DEVELOPMENT,
			variables: {},
			urls: {},
		},
	},
	variables: {
		[VariableNames.LOCALE_ENABLED]: true,
		[VariableNames.LOCALE_ROUTING_ENABLED]: false,
		[VariableNames.VERSIONED_STATIC_ROOT]: process.env.VERSIONED_STATIC_ROOT,
		[VariableNames.STATIC_ROOT]: process.env.STATIC_ROOT,
	},
	urls: {
		[URLNames.LOCALE]: `${process.env.VERSIONED_STATIC_ROOT}locale/{locale}.json`,
	},
	properties: {
		[PropertyNames.DEFAULT_LOCALE]: 'en-gb',
		[PropertyNames.AVAILABLE_LOCALES]: ['en-gb'],
	},
};

let environment = EnvironmentNames.PRODUCTION;
const host = document.location.host;

switch (host.split(':').shift()) {
	case 'localhost': {
		environment = EnvironmentNames.LOCAL;
		break;
	}
	default: {
		environment = EnvironmentNames.PRODUCTION;
		break;
	}
}

export default {
	config,
	environment,
};
