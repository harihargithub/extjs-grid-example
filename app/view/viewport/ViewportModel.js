Ext.define('SenchaExample.view.viewport.ViewportModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.viewport',


    data: {
        darkMode: false,
        // Current Location
        i18n: {}
    },
    

    constructor: function (config) {
        const me = this;
        const ret = me.callParent([config]);
        // We will proxy all calls to i18n properties to the library
        me.initi18n();
        return ret;
    },

    privates: {
        /**
         * Creating a Proxy to broadcast requests to i18n
         */
        initi18n: function () {
            const me = this;
            me.set('i18n', new Proxy({}, me.i18nHandler));
        },
        /**
         * Updating localization data (for example, if it is edited at the front and it is necessary
         * immediately apply the changes.
         * @param {Object} data localization data
         * @param {Boolean} apply default is true, automatically applies localization
         */
        loadI18nResource: function (data, apply = true) {
            i18next.default.services.resourceStore.data = Ext.clone(data);
            if (apply) {
                this.initi18n();
            }
        },
        /**
         * Proxy Method Handler
         */
        i18nHandler: {
            get: function (target, name) {
                if (i18next.exists(name)) {
                    return i18next.t(name);
                }
                return target[name];
            }
        }
    }
});