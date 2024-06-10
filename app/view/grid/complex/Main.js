Ext.define('SenchaExample.view.grid.complex.Main', {
    extend: 'Ext.Container',
    xtype: 'complexgridcontainer',
    controller: 'complexgridmaincontroller',
    layout: {
        type: 'hbox'
    },
    items: [{
        flex: 1,
        reference: 'complexGrid',
        xtype: 'complexgrid'
    }, {
        xtype: 'featuresconfigurator',
        platformConfig: {
            '!phone': {
                items: [{
                    xtype: 'complexgridsettings'
                }]
            },
            'phone': {
                hidden: true
            }
        }
    }]
});

