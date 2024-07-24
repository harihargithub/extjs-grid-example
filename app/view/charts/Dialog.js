Ext.define('SenchaExample.view.charts.Dialog', {
    extend: 'Ext.Dialog',
    requires: [
        'SenchaExample.view.charts.CustomTheme'
    ],
    closable: true,
    maximizable: true,
    platformConfig: {
        'desktop': {
            maximized: false
        },
        '!desktop': {
            maximized: true
        }
    },
    modal: true,
    width: 1024,
    height: 768,
    layout: 'fit',
    bind: {
        title: '{i18n.CHARTS} - {groupLabel}'
    },
    iconCls: 'x-fa fa-chart-line',
    items: [{
        xtype: 'tabpanel',
        reference: 'tabpanel',
        items: [{
            tab: {
                title: 'Sencha Ext JS Chart',
                // bind: {
                //     title: '{i18n.PIE_CHART}',
                // },
            },
            iconAlign: 'left',
            iconCls: 'x-fa fa-chart-bar',
            itemId: 'sencha',
            layout: 'fit'
        }
        // , {
        //     tab: {
        //         title: 'FusionCharts',
        //         // bind: {
        //         //     title: '{i18n.BAR_CHART}',
        //         // },
        //     },
        //     iconAlign: 'left',
        //     iconCls: 'x-fa fa-chart-line',
        //     itemId: 'fusioncharts',
        //     layout: 'fit',
        //     html: '<h1>Coming Soon</h1>'
        // }
    ]
    }]
});