Ext.define('SenchaExample.view.grid.grouped.agGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.groupedaggridcontroller',

    onGroupGrid: function (toggle, newValue) {
        var grid = this.getView();
        grid.getStore().setGroupField(newValue ? 'region' : null);
    },

    showFiltersHandler: function () {
        var grid = this.getView();
        grid.getPlugin('gridfilters').showMenuBy(null);
    },

    clearFilters: function () {
        var grid = this.getView();
        grid.getStore().clearFilter();
    },

    onToggleFilterBarVisibility: function (toggle, newValue) {
        var grid = this.getView();
        grid.getPlugin('gridfilters').setVisible(newValue);
    }
});