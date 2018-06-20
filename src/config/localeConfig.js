import { PropertyNames, VariableNames } from '../data/enum/configNames';
import { getValue } from '../util/injector';
import { CONFIG_MANAGER } from '../data/Injectables';

const getLocaleConfig = () => {
  const configManager = getValue(CONFIG_MANAGER);

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
    persistent: false,
    defaultCode: configManager.getProperty(PropertyNames.DEFAULT_LOCALE),
    languages,
  };

  return {
    localeEnabled: configManager.getVariable(VariableNames.LOCALE_ENABLED),
    localeRoutingEnabled: configManager.getVariable(VariableNames.LOCALE_ROUTING_ENABLED),
    config,
  };
};

export default getLocaleConfig;
