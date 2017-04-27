import { CONFIG_MANAGER } from 'data/Injectables';
import config from 'config/config';
import ConfigManager from 'seng-config';

import { setValue } from './injector';

const setupInjects = () => {
	const configManager = new ConfigManager();

	configManager.init(config.config, config.environment);

	setValue(CONFIG_MANAGER, configManager);
};

export default setupInjects;
