Ext.define('SenchaExample.view.desktop.Main', {
    extend: 'Ext.Container',
    requires: [
        'Ext.tab.Panel',
        'SenchaExample.view.desktop.NavigationBar',
        'SenchaExample.view.desktop.MainController'
    ],
    controller: 'desktopmain',
    id: 'mainPanel',
    layout: {
        type: 'hbox'
    },
    items: [{
        id: 'mainNavigationBar',
        xtype: 'desktopnavigationbar',
        title: 'Sencha Ext JS Grid',
        docked: 'top',
        items: [{
            xtype: 'component',
            cls: ['ext', 'ext-sencha'],
            style: 'padding-right: 10px'
        }, {
            bind: {
                text: '{i18n.VIDEO_TOUR}',
            },
            align: 'right',
            iconCls: 'x-fab fa-youtube',
            xtype: 'button',
            handler: function (button) {
                window.open('https://www.youtube.com/@Sencha', '_blank');
            },
            style: 'padding-right: 10px'
        },{
            xtype: 'button',
            align: 'right',
            bind: {
                text: '{i18n.TRY_EXTJS}'
            },
            ui: 'green',
            handler: function (button) {
                window.open('https://www.sencha.com/products/extjs/evaluate/', '_blank');
            }
            //tooltip: 'Evaluate Ext JS Trial Now'
        }, {
            align: 'right',
            id: 'materialThemeMenuButton',
            hidden: true,
            menu: {
                itemId: 'materialThemeMenu'
            },
            iconCls: 'palette',
            arrow: false,
            //tooltip: 'Change theme color'
        }, {
            align: 'right',
            menu: {
                itemId: 'burgerButtonMenu'
            },
            iconCls: 'menu',
            arrow: false,
            //tooltip: 'Change theme and/or localization'
        }]
    },
    {
        xtype: 'tabpanel',
        id: 'cardPanel',
        reference: 'contentPanel',
        flex: 1,
        tabBar: {
            defaults: {
                iconAlign: 'top'
            }
        },

        items: [{
            // tab: {
            //     bind: {
            //         title: '{i18n.HOME}'
            //     }
            // },
            title: 'Ext.grid.Grid',
            xtype: 'complexgridcontainer'
        }, {
            title: 'Ext.grid.TreeGrouped',
            xtype: 'groupedgridcontainer',
        }, {
            title: 'Ext.pivot.Grid',
            xtype: 'pivotgridcontainer',
        }]
    }]
});