const loadedLanguages = [];
let loadCallback;

export default {
  isLoaded(locale) {
    return loadedLanguages.includes(locale);
  },
  setLoadCallback(callback) {
    loadCallback = callback;
  },
  getTranslation({ translationKey, code }) {
    return import(`../data/locale/${translationKey}.json`).then(result => {
      loadedLanguages.push(code);

      if (loadCallback) {
        // add timeout of 1 frame to make sure vue-i18n-manager processed the file
        setTimeout(() => {
          loadCallback(code);
        });
      }
      return result;
    });
  },
};
