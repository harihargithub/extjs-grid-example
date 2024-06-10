Ext.define('SenchaExample.view.grid.complex.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.complexgridmaincontroller',

    init: function (cmp) {
        const me = this;

        me.grid = me.lookup('complexGrid');

        me.grid.on('selectionchange', me.onSelectionChange, me);
    },

    onGroupGrid: function (field, newValue, oldValue) {
        this.grid.setGrouped(newValue);
    },

    onToggleGridFilter: function (field, newValue, oldValue) {
        // this.grid.setRowNumbers(newValue);
    },

    onToggleFilterBarVisibility: function (field, newValue, oldValue) {
        const me = this;

        if (newValue) {
            me.grid.showFilterBar();
        } else {
            me.grid.hideFilterBar();
        }
    },

    clearFilters: function () {
        const filters = this.grid.getStore().getFilters(false);

        if (filters) {
            filters.removeAll();
        }
    },

    showFiltersHandler: function () {
        const me = this;

        let data = [], i, r;

        // The actual record filters are placed on the Store.
        me.grid.getStore().getFilters().each(function (filter) {
            data.push(filter.serialize());
        });

        // Pretty it up for presentation
        data = Ext.JSON.encodeValue(data, '\n').replace(/^[ ]+/gm, function (s) {
            for (r = '', i = s.length; i--;) {
                r += '&#160;';
            }

            return r;
        });
        data = data.replace(/\n/g, '<br>');

        Ext.Msg.alert(i18next.t('FILTER_DATA'), data);
    },
    //Selection Model

    getSelectable: function () {
        return this.grid.getSelectable();
    },

    onSelectionChange: function (grid, records, selecting, selection) {
        var status = this.lookup('status'),
            message = '??',
            firstRowIndex,
            firstColumnIndex,
            lastRowIndex,
            lastColumnIndex;

        if (!selection) {
            message = i18next.t('NO_SELECTION');
        }
        else if (selection.isCells) {
            firstRowIndex = selection.getFirstRowIndex();
            firstColumnIndex = selection.getFirstColumnIndex();
            lastRowIndex = selection.getLastRowIndex();
            lastColumnIndex = selection.getLastColumnIndex();

            message = i18next.t('SELECTED_CELLS') + ': ' + (lastColumnIndex - firstColumnIndex + 1) +
                'x' + (lastRowIndex - firstRowIndex + 1) +
                ' (' + firstColumnIndex + ',' + firstRowIndex + ')';
        }
        else if (selection.isRows) {
            message = i18next.t('SELECTED_ROWS') + ': ' + selection.getCount();
        }
        else if (selection.isColumns) {
            message = i18next.t('SELECTED_COLUMNS') + ': ' + selection.getCount();
        }
        if (status) {
            status.setHtml(message);
        }else{
            Ext.toast(message);
        }

    },

    onSelectableChange: function (menuitem, checked) {
        const sel = this.getSelectable(),
            fn = menuitem.fn;

        if (fn === 'setChecked') {
            checked = checked ? 'only' : true;
        }

        sel[fn](checked);
    },

    onExtensibleChange: function (menuitem, checked) {
        let sel;

        if (checked) {
            sel = this.getSelectable();

            sel.setExtensible(menuitem.getValue());
        }
    }
});
