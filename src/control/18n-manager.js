import localeConfig from 'config/localeConfig';
import VueI18nManager from 'vue-i18n-manager';

export default function i18nManagerInit(Vue, router, store) {
	if (localeConfig.localeEnabled) {
		Vue.use(VueI18nManager, {
			store,
			router,
			config: localeConfig.config,
			proxy: localeConfig.proxy,
		});

		Vue.initI18nManager();
	}
}
