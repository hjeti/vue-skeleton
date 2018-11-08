import { PropertyNames, VariableNames } from '../data/enum/configNames';
import configManager from '../util/configManager';

const languages = configManager.getProperty(PropertyNames.AVAILABLE_LOCALES).map(locale => {
  if (typeof locale === 'string') {
    return {
      code: locale,
      urlPrefix: locale,
      translationKey: locale,
    };
  }
  return locale;
});

const config = {
  languages,
  persistent: false,
  defaultCode: configManager.getProperty(PropertyNames.DEFAULT_LOCALE),
};

export default {
  config,
  localeEnabled: configManager.getVariable(VariableNames.LOCALE_ENABLED),
  localeRoutingEnabled: configManager.getVariable(VariableNames.LOCALE_ROUTING_ENABLED),
};
