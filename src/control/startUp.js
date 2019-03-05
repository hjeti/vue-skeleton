import Vue from 'vue';
import axios from 'axios';
import DeviceStateTracker from 'seng-device-state-tracker';
import VueExposePlugin from '../util/VueExposePlugin';
import gateway from '../util/gateway';
import configManager from '../util/configManager';
import { URLNames, PropertyNames, VariableNames } from '../data/enum/configNames';
import { RouteNames } from '../router/routes';
import { createPath } from '../util/routeUtils';
import Params from '../data/enum/Params';
import localeLoader from '../util/localeLoader';
import { mediaQueries, deviceState } from '../data/mediaQueries.json';
import waitForStyleSheetsLoaded from '../util/waitForStyleSheetsLoaded';

const initPlugins = () => {
  const cleanMediaQueries = Object.keys(mediaQueries).reduce((result, key) => {
    result[key] = mediaQueries[key].replace(/'/g, '');
    return result;
  }, {});

  // expose objects to the Vue prototype for easy access in your vue templates and components
  Vue.use(VueExposePlugin, {
    $config: configManager,
    $gateway: gateway,
    $http: axios,
    $versionRoot: configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT),
    $staticRoot: configManager.getVariable(VariableNames.STATIC_ROOT),
    URLNames,
    PropertyNames,
    VariableNames,
    RouteNames,
    Params,
    createPath,
    $deviceStateTracker: new DeviceStateTracker({
      mediaQueries: cleanMediaQueries,
      deviceState,
      showStateIndicator: process.env.NODE_ENV !== 'production',
    }),
    DeviceState: deviceState,
  });
};

const waitForLocale = store =>
  new Promise(resolve => {
    if (localeLoader.isLoaded(store.getters.currentLanguage.code)) {
      resolve();
    } else {
      localeLoader.setLoadCallback(locale => {
        if (locale === store.getters.currentLanguage.code) {
          resolve();
        }
      });
    }
  });

export default store => {
  // Initialise plugins
  initPlugins();

  // Add async methods to the Promise.all array
  return Promise.all([
    configManager.getVariable(VariableNames.LOCALE_ENABLED)
      ? waitForLocale(store)
      : Promise.resolve(),
    process.env.NODE_ENV !== 'production' ? waitForStyleSheetsLoaded(document) : Promise.resolve(),
  ]);
};
