/**
 * @class SenchaExample.controller.phone.Main
 * @extends SenchaExample.controller.Main
 *
 * This is the Main controller subclass for the 'phone' profile. Most of the functionality required for this controller
 * is provided by the KitchenSink.controller.Main superclass, but we do need to add a couple of refs and control
 * statements to provide the  different behavior for the phone.
 *
 * This provides a couple of capabilities that we need. Firstly it sets up a listener on the main
 * navigation NestedList and redirects to the appropriate url for each view. For example, tapping on the 'Forms' item
 * in the list will redirect to the url 'forms'.
 *
 * Secondly, we set up a route that listens for urls in the form above and calls the controller's showView function
 * whenever one is detected. The showView function then just shows the appropriate view on the screen.
 *
 */
Ext.define('SenchaExample.controller.phone.Main', {
    extend: 'SenchaExample.controller.Main',

    /**
     * @private
     */
    viewCache: [],

    refs: {
        toolbar: '#mainNavigationBar'
    },

    getAvailableThemes: function() {
        var items = this.callParent();

        delete items[0].xtype;

        
        items.push({
            bind: {
                text: '{i18n.DOCUMENTATION}',
            },
            iconCls: 'x-fa fa-file',
            href: 'https://docs.sencha.com/extjs/latest/',
            target: '_blank'
        });
        items.push({
            bind: {
                text: '{i18n.COMMUNITY}',
            },
            iconCls: 'x-fab fa-discord',
            href: 'https://discord.gg/RfxMGSbHXT',
            target: '_blank'            
        });
        items.push({
            text:'GitHub',
            iconCls: 'x-fab fa-github',
            href: 'https://github.com/sencha-extjs-examples/extjs-grid-example',
            target: '_blank'            
        });


        return items;
    },

    parseAvailableThemes: function(me) {
        var oldParser = this.callParent([me]);

        /**
         * Non material themes on phones use Ext.ActionSheet
         * which does not support menu items so we need
         * to remove the xtype to let it use the default.
         */
        return Ext.theme.is.Material
            ? oldParser
            : function(theme) {
                theme = oldParser.call(this, theme);

                delete theme.xtype;

                return theme;
            };
    }
});