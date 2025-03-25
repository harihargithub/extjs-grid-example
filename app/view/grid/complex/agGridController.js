Ext.define('SenchaExample.view.grid.complex.agGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.complexaggridcontroller',

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