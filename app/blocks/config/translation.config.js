(function() {
    'use strict';

    angular
        .module('swibApp')
        .config(translationConfig);

    translationConfig.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];

    function translationConfig($translateProvider, tmhDynamicLocaleProvider) {
        // Initialize angular-translate
        $translateProvider.useLoader('$translatePartialLoader', {
            // urlTemplate: 'i18n/{lang}/{part}.json'
            urlTemplate : i18nUrl
        });

        //TODO - How to handler error when i18n resource unavailable?

        $translateProvider.preferredLanguage('vi');
        $translateProvider.useStorage('translationStorageProvider');
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.addInterpolation('$translateMessageFormatInterpolation');

        tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.useCookieStorage();
        tmhDynamicLocaleProvider.storageKey('NG_TRANSLATE_LANG_KEY');

        /**
         *
         * @param _part
         * @param _lang
         * @returns {*}
         */
        function i18nUrl(_part, _lang) {
            //Default i18n json file
            var urlTemplate = 'i18n/{lang}/{part}.json';

            if(!angular.isUndefined($swib)) {
                urlTemplate = $swib.i18nUrl(_part, urlTemplate);
            }

            console.log("urlTemplate - i18nUrl:" + urlTemplate);
            return urlTemplate.replace(/\{part\}/g, _part).replace(/\{lang\}/g, _lang);
        }
    }
})();
