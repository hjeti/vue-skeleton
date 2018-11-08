import axios from 'axios';
import { URLNames } from '../data/enum/configNames';
import configManager from './configManager';

const gateway = axios.create({
  baseURL: configManager.getURL(URLNames.API),
  headers: {
    Accept: 'application/json',
  },
  responseType: 'json',
});

gateway.interceptors.response.use(
  response =>
    response && response.data && typeof response.data.data !== 'undefined'
      ? { ...response, ...response.data }
      : response,
  error => {
    throw error;
  },
);

export default gateway;
