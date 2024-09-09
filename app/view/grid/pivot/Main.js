Ext.define('SenchaExample.view.grid.pivot.Main', {
    extend: 'Ext.Container',
        xtype: 'newpivotgridcontainer', // Updated xtype to match the new PivotTable implementation
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

