Ext.define('SenchaExample.profile.Phone', {
    extend: 'SenchaExample.profile.Base',

    controllers: ['Main'],

    //mainView: 'phone.Main',

    isActive: function() {
        return Ext.os.is.Phone; // || Ext.os.is.Desktop;
    },

    launch: async function () {
        await this.callParent(arguments);

        Ext.Viewport.add(Ext.create('SenchaExample.view.phone.Main'));

        Splashscreen.hide();
    }
});