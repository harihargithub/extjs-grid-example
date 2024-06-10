Ext.define('SenchaExample.view.grid.pivot.Main', {
    extend: 'Ext.Container',
    xtype: 'pivotgridcontainer',
    controller: 'complexpivotgridmaincontroller',
    layout: {
        type: 'hbox'
    },
    items: [{
        flex: 1,
        reference: 'pivotGrid',
        xtype: 'complexpivotgrid'
    }, {
        xtype: 'featuresconfigurator',
        platformConfig: {
            'phone': {
                hidden: true
            }
        },
        items: [{
            xtype: 'pivotgridsettings'
        }]
    }]
});

