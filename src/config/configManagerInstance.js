import ConfigManager from 'seng-config';
import config from './config';

const configManager = new ConfigManager();

configManager.init(config.config, config.environment);

export default configManager;
