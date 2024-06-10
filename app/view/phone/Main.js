Ext.define('SenchaExample.view.phone.Main', {
    extend: 'Ext.Container',

    requires: [
        'Ext.TitleBar',
        'Ext.ActionSheet'
    ],

    scrollable: true,
    layout: {
        type: 'hbox'
    },
    items: [{
        id: 'mainNavigationBar',
        xtype: 'titlebar',
        docked: 'top',
        title: 'Sencha Ext JS Grid',

        items: [ {
            align: 'right',
            id: 'materialThemeMenuButton',
            hidden: true,
            menu: {
                itemId: 'materialThemeMenu',
                xtype: 'actionsheet',
                hideOnMaskTap: true
            },
            iconCls: 'palette',
            arrow: false
        }, {
            xtype: 'button',
            align: 'right',
            action: 'burger',
            menu: {
                itemId: 'burgerButtonMenu'
            },
            // menu: Ext.theme.is.Material
            //     ? {
            //         itemId: 'burgerButtonMenu'
            //     }
            //     : {
            //         xtype: 'actionsheet',
            //         side: 'right',
            //         itemId: 'burgerButtonMenu',
            //         width: 200,
            //         viewportMenuConfigs: {
            //             right: {
            //                 reveal: false
            //             }
            //         }
            //     },
            iconCls: 'menu',
            arrow: false
        }]
    },{
        xtype: 'tabpanel',
        id: 'cardPanel',
        reference: 'contentPanel',
        flex: 1,
        tabBar: {
            //  docked: 'bottom',
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