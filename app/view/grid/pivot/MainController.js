Ext.define('SenchaExample.view.grid.pivot.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.complexpivotgridmaincontroller',

    init: function (cmp) {
        const me = this;

        me.grid = me.lookup('pivotGrid');

    },

    expandAll: function() {
        this.grid.expandAll();
    },

    collapseAll: function() {
        this.grid.collapseAll();
    },

    reconfigureMatrix: function(button, checked) {
        if (!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.grid.reconfigurePivot(button.cfg);
    }
});
