Ext.define('SenchaExample.view.grid.grouped.Main', {
    extend: 'Ext.Container',
    xtype: 'groupedgridcontainer',
    controller: 'groupedgridmaincontroller',
    layout: {
        type: 'fit'
    },
    items: [{
        flex: 1,
        reference: 'groupedGrid',
        xtype: 'groupedgrid'
    }]
});

