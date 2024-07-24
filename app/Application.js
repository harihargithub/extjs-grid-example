Ext.define('SenchaExample.Application', {
    extend: 'Ext.app.Application',
    name: 'SenchaExample',
    namespace: 'SenchaExample',
    requires: [
        'SenchaExample.*',
        'Ext.Stateful',
        'Ext.state.LocalStorage',
        'Ext.Toast'
    ],
    quickTips: {
        tooltip: {
            showOnTap: true
        },
        overflowTip: {
            // This means that mouseover (or a touch)
            // cancels the auto dismiss timer to give the
            // user an opportunity to read long text.
            // Tap outside of the tip then closes it.
            allowOver: true
        }
    },
    // the Example App has Phone and Tablet modes, which rearrange the screen based on the type
    // of device detected
    profiles: [
        'SenchaExample.profile.Desktop',
        'SenchaExample.profile.Tablet',
        'SenchaExample.profile.Phone'
    ],
    viewport: {
        viewModel: 'viewport',
        controller: 'viewport'
    },

    init: function(){
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            Ext.GlobalEvents.fireEvent('prefrescolorschemechanged');
        });
    },

    onBeforeLaunch: function () {
        Ext.state.Provider.register(new Ext.state.LocalStorage());

        this.callParent();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm(i18next.t('APP_UPDATE'), i18next.t('RELOAD_APP'),
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
