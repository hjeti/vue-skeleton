import ConfigManager from 'seng-config';
import * as axios from 'axios';
import { CONFIG_MANAGER, GATEWAY } from '../data/Injectables';
import config from '../config/config';
import { URLNames } from '../data/enum/configNames';

import { setValue } from './injector';
import { responseFormatter, errorFormatter } from './gatewayFormatter';

const setupInjects = () => {
  const configManager = new ConfigManager();
  configManager.init(config.config, config.environment);

  const gateway = axios.create({
    baseURL: configManager.getURL(URLNames.API),
    headers: {
      Accept: 'application/json',
    },
    responseType: 'json',
  });

  gateway.interceptors.response.use(
    response => responseFormatter(response),
    error => {
      throw errorFormatter(error);
    },
  );

  setValue(CONFIG_MANAGER, configManager);
  setValue(GATEWAY, gateway);
};

export default setupInjects;
