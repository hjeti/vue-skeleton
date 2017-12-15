import Vue from 'vue';
import axios from 'axios';
import VueExposePlugin from 'util/VueExposePlugin';
import { URLNames, PropertyNames, VariableNames } from 'data/enum/configNames';
import PageNames from 'data/enum/PageNames';
import PagePaths from 'data/enum/PagePaths';
import { createPath } from 'util/routeUtils';
import Params from 'data/enum/Params';
import { getValue } from 'util/injector';
import { CONFIG_MANAGER, GATEWAY } from 'data/Injectables';
import localeLoader from 'util/localeLoader';

const initPlugins = () => {
  const configManager = getValue(CONFIG_MANAGER);

  // expose objects to the Vue prototype for easy access in your vue templates and components
  Vue.use(VueExposePlugin, {
    $config: configManager,
    $gateway: getValue(GATEWAY),
    $http: axios,
    $versionRoot: configManager.getVariable(VariableNames.VERSIONED_STATIC_ROOT),
    $staticRoot: configManager.getVariable(VariableNames.STATIC_ROOT),
    URLNames,
    PropertyNames,
    VariableNames,
    PageNames,
    PagePaths,
    Params,
    createPath,
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

const startUp = store => {
  // Initialise plugins
  initPlugins();

  const configManager = getValue(CONFIG_MANAGER);

  // Add async methods to the Promise.all array
  return Promise.all([
    configManager.getVariable(VariableNames.LOCALE_ENABLED)
      ? waitForLocale(store)
      : Promise.resolve(),
  ]);
};

export default startUp;
