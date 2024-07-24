Ext.define('SenchaExample.view.desktop.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.desktopmain',

    clearFilters: function () {
        const filters = this.getView().getStore().getFilters(false);

        if (filters) {
            filters.removeAll();
        }
    },

    onFilterChanged: function (store, filters) {
        this.getViewModel().set('filtered', filters.length > 0);
    },


    onGridTypeChange: function (field, newValue, oldValue) {
        const me = this;
        
        contentPanel = me.lookup('contentPanel'),
            cmp = me.lookup(newValue);

        if (cmp) {
            contentPanel.setActiveItem(cmp);
        }
    },

    onAboutHandler: function () {
        Ext.create({
            xtype: 'dialog',
            modal: true,
            bind: {
                title: '{i18n.ABOUT} - Sencha Ext JS Grid',
            },
            closable: true,
            width: 500,
            height: 400,
            platformConfig: {
                phone: {
                    maximized: true
                }
            },
            layout: 'fit',
            items: [{
                xtype: 'formpanel',
                defaults: {
                    labelAlign: 'top'
                },
                items: [{
                    xtype: 'displayfield',
                    label: 'Ext JS Framework Version',
                    value: Ext.versions.extjs.version
                }, {
                    xtype: 'displayfield',
                    label: 'Ext JS Toolkit',
                    value: Ext.manifest.toolkit
                }, {
                    xtype: 'displayfield',
                    label: 'Theme',
                    value: SenchaExample.theme
                }, {
                    xtype: 'displayfield',
                    label: 'Locale',
                    value: SenchaExample.locale
                }, {
                    xtype: 'displayfield',
                    label: 'Build Timestamp',
                    value: Ext.manifest.buildTimestamp
                }, {
                    xtype: 'displayfield',
                    label: 'localization Package',
                    value: 'https://github.com/i18next/i18next'
                }]
            }]
        }).show();
    }
});