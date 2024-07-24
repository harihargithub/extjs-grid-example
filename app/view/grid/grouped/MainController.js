Ext.define('SenchaExample.view.grid.grouped.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.groupedgridmaincontroller',

    init: function (cmp) {
        const me = this;

        me.grid = me.lookup('groupedGrid');
    }
});
