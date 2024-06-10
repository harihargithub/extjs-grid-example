Ext.define('SenchaExample.view.tablet.Main', {
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
            xtype: 'button',
            align: 'right',
            bind: {
                text: '{i18n.ABOUT}'
            },
            handler: 'onAboutHandler',
        }, {
            xtype: 'button',
            align: 'right',
            bind: {
                text: '{i18n.DOCUMENTATION}'
            }
        }, {
            xtype: 'button',
            align: 'right',
            bind: {
                text: '{i18n.COMMUNITY}'
            }
        }, {
            xtype: 'button',
            align: 'right',
            bind: {
                text: '{i18n.TRY_EXTJS}'
            },
            href: 'https://www.sencha.com/products/extjs/evaluate/',
            ui: 'green'
        }, {
            align: 'right',
            id: 'materialThemeMenuButton',
            hidden: true,
            menu: {
                itemId: 'materialThemeMenu'
            },
            iconCls: 'palette',
            arrow: false
        }, {
            align: 'right',
            menu: {
                itemId: 'burgerButtonMenu'
            },
            iconCls: 'menu',
            arrow: false
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