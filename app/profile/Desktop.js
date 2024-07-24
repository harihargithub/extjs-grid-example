Ext.define('SenchaExample.profile.Desktop', {
    extend: 'SenchaExample.profile.Base',

    controllers: ['Main'],

    //mainView: 'desktop.Main',

    isActive: function () {
        return Ext.os.is.Desktop;
    },

    launch: async function () {
        await this.callParent(arguments);

        Ext.Viewport.add(Ext.create('SenchaExample.view.desktop.Main'));

        Splashscreen.hide();
    }
});