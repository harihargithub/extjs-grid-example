Ext.define('SenchaExample.profile.Tablet', {
    extend: 'SenchaExample.profile.Base',

    controllers: ['Main'],

   // mainView: 'tablet.Main',

    isActive: function() {
        return Ext.os.is.Tablet;
    },

    launch: async function () {
        await this.callParent(arguments);

        Ext.Viewport.add(Ext.create('SenchaExample.view.tablet.Main'));

        Splashscreen.hide();
    }
});