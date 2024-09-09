const exportUtils = require('../util/exportUtils');

Ext.define('SenchaExample.view.grid.pivot.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pivotgridcontroller',

    destroy: function() {
        Ext.destroy(this.menuExport);
    },

    showConfigurator: function() {
        this.getView().showConfigurator();
    },
    
    yearLabelRenderer: function(value) {
        return 'Year ' + value;
    },

    monthLabelRenderer: function(value) {
        return Ext.Date.monthNames[value];
    },

    coloredRenderer: function(v, record, dataIndex, cell, column) {
        cell.setStyle(Ext.String.format('color: {0};', v > 500 ? 'green' : 'red'));

        return Ext.util.Format.number(v, '0,000.00');
    },

    onPivotGroupExpand: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups expanded on ') + type);
    },

    exportDocument: function(menuitem) {
        var pivotgrid = this.getView(),
            cfg = menuitem.cfg;

        if (cfg.matrix === true) {
            cfg.matrix = pivotgrid.getMatrix();
        }

        if (!cfg.title) {
            cfg.title = 'Pivot grid export demo';
        }

        pivotgrid.saveDocumentAs(menuitem.cfg).then(null, this.onError);
    },

    onError: function(error) {
        Ext.Msg.alert('Error', typeof error === 'string' ? error : 'Unknown error');
    },

    onBeforeDocumentSave: function(view) {
        view.mask({
            xtype: 'loadmask',
            //message: 'Document is prepared for export. Please wait ...'
        });
    },

    onDocumentSave: function(view) {
        view.unmask();
    },

    getPerformance: function(records, dataIndex) {
        var ret = [],
            len = records.length,
            i;

        for (i = 0; i < len; i++) {
            ret.push(records[i].get(dataIndex));
        }

        return ret.length ? ret : null;
    },

    onPivotItemTap: function (params, e, eOpts) {
        var leftAxis = params.grid.getLeftAxisItem(params.cell.getRecord()),
            dataIndex = params.leftItem.dimension.dataIndex;
         

        if (e.getTarget().className == 'pivot-grid-group-title') {
            Ext.Msg.alert('Sencha Ext JS', i18next.t('TRY_EXTJS'));
            return false;
        }
    }

});