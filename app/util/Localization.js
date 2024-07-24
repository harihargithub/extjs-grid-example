Ext.define('SenchaExample.util.Localization', {
    alternateClassName: ['Localization'],
    singleton: true,
    /**
     * Loads and initializes localization
     * @param {String} locale selected locale
     */
    init: function (locale = 'en') {
        return new Ext.Promise(function (resolve) {
            // Subscribe to events
            i18next.on('initialized', function() {
                i18next.on('languageChanged', function () {
                    // When changing the language, we need to update the localization data
                    Ext.Viewport.getViewModel().initi18n();
                });
                resolve(true);
            })
            // request Localization file
            Ext.Ajax.request({
                url: `${Ext.getResourcePath('localization.json')}`,
                method: 'GET',
                cors: true,
                useDefaultXhrHeader: true,
                withCredentials: true,
                success: function (response) {
                    i18next.init({
                        lng: locale,
                        debug: true,
                        resources: Ext.decode(response.responseText)
                    }, function (err) {
                        if (err) {
                            Ext.raise('Failed init Localization')
                        };
                    });
                },
                failure: function () {
                    resolve(false);
                }
            });
        });
    },
});