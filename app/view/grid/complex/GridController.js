Ext.define('SenchaExample.view.grid.complex.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.complexgridcontroller',

    requires: [
        'Ext.exporter.text.CSV',
        'Ext.exporter.text.TSV',
        'Ext.exporter.text.Html',
        'Ext.exporter.excel.Xml',
        'Ext.exporter.excel.Xlsx'
    ],

    init: function (view) {
        const me = this;

        if (Ext.os.is.Desktop) {

            view.el.on({
                scope: me,
                contextmenu: me.onContextMenu
            });
        }

        me.callParent([view]);
    },


    destroy: function () {
        const me = this;
        me.toolMenu = Ext.destroy(me.toolMenu);

        me.callParent();
    },

    nameSorter: function (rec1, rec2) {
        // Sort prioritizing surname over forename as would be expected.
        const rec1Name = rec1.get('surname') + rec1.get('forename'),
            rec2Name = rec2.get('surname') + rec2.get('forename');

        if (rec1Name > rec2Name) {
            return 1;
        }

        if (rec1Name < rec2Name) {
            return -1;
        }

        return 0;
    },


    getMenu: function () {
        const me = this;
        let menu = me.toolMenu,
            view = me.getView();

        if (!menu) {
            me.toolMenu = menu = Ext.create(Ext.apply({
                ownerCmp: view
            }, view.toolContextMenu));
        }

        return menu;
    },

    updateMenu: function (record, el, e, align) {
        const menu = this.getMenu();

        if (record) {
            this.getViewModel().set('record', record.getData());
            menu.autoFocus = !e.pointerType;
            menu.showBy(el, align);
        }
    },

    onContextMenu: function (e, el) {
        const me = this,
            grid = me.getView(),
            target = e.getTarget(grid.itemSelector);
        let item;

        if (target) {
            e.stopEvent();

            item = Ext.getCmp(target.id);

            if (item) {
                me.updateMenu(item.getRecord(), el, e, 't-b?');
            }
        }
    },

    onMenu: function (grid, context) {
        this.updateMenu(context.record, context.tool.el, context.event, 'r-l?');
    },

    salarySummaryRenderer: function (value) {
        return Ext.util.Format.usMoney(value);
    },

    onVerifyAllTap: function (button) {
        var row = button.up('gridrow'),
            group = row.getGroup(),
            view = this.getView(),
            store = view.getStore(),
            count;

        if (group) {
            count = group.length;
        }
        else {
            count = store.getCount();
        }

        Ext.Msg.confirm(i18next.t('TRY_EXTJS'),
        i18next.t('VERIFY') + ' ' + count + ' ' + i18next.t('EMAIL')+ 'Ï?',
            function (answer) {
                if (answer === 'yes') {
                    (group || store).each(function (rec) {
                        rec.set('verified', true);
                    });
                }
            });
    },

    onVerifyTap: function (btn) {
        var cell = btn.up(),
            rec = cell.getRecord();

        rec.set('verified', true);
        Ext.Msg.alert(i18next.t('VERIFY'), i18next.t('VERIFY') + ' ' + rec.get('forename') + ' ' + rec.get('surname'));
    },

    exportDocument: function (btn) {
        var cfg = Ext.merge({
            title: 'Grid export demo',
            fileName: 'GridExport' + '.' + (btn.cfg.ext || btn.cfg.type)
        }, btn.cfg);

        this.getView().saveDocumentAs(cfg);
    },

    onBeforeDocumentSave: function (view) {
        view.mask({
            xtype: 'loadmask',
            //message: 'Document is prepared for export. Please wait ...'
        });
    },

    onDocumentSave: function (view) {
        view.unmask();
    },

    onColumnMenuCreated: function (grid, column, menu) {
        menu.add([{
            // Need xtype because it's a weighted container
            xtype: 'menucheckitem',
            checked: grid.getColumnLines(),
            //text: 'Column Lines',
            bind: {
                text: '{i18n.COLUMN_LINES}'
            },
            checkHandler: function (column, checked) {
                this.lookupController().getView().setColumnLines(checked);
            }
        }, {
            // Need xtype because it's a weighted container
            xtype: 'menucheckitem',
            checked: grid.getRowNumbers(),
            // text: 'Row Numbers',
            bind: {
                text: '{i18n.ROW_NUMBERS}'
            },
            checkHandler: function (column, checked) {
                this.lookupController().getView().setRowNumbers(checked);

            }
        }]);
    },

    onTryButtonTap: function (button) {
        window.open('https://www.sencha.com/products/extjs/', '_blank');
    },

    onGear: function () {
        Ext.toast({
            message: i18next.t('TRY_EXTJS'),
            timeout: 5000
        })
    },
    //---------------------
    // Group actions:

    onGroupPrint: function (grid, info) {
        this.doGroup(info, i18next.t('PRINT_GROUP'));
    },

    onGroupRefresh: function (grid, info) {
        this.doGroup(info, i18next.t('REFRESH_GROUP'));
    },

    onGroupSave: function (grid, info) {
        this.doGroup(info, i18next.t('SAVE_GROUP'));
    },

    doGroup: function (info, action) {
        var tpl = Ext.XTemplate.getTpl(this.getView(), 'helperTpl');

        Ext.Msg.alert(action, tpl.apply({
            group: info.group
        }));
    },

    onChartGroup: function (item, evt) {

        const group = item.up('itemheader').getGroup();

        console.log(group);
        let win = Ext.create('SenchaExample.view.charts.Dialog', {
            // senchaChartConfig: senchaChartConfig,
            viewModel: {
                data: {
                    group: group
                },
                stores: {
                    salaries: {
                        fields: ['salary', 'fullName', 'age'],
                        data: group.data.items
                    }
                },
                formulas: {
                    groupLabel: function (get) {
                        return get('group').data.getLabel();
                    }
                }
            }
        });

        win.down('#sencha').add(item.senchaChartConfig);

        win.show();
    },

    onDropRow: function () {
        this.tryExtJS();
    },

    tryExtJS: function () {
        Ext.Msg.alert({
            message: i18next.t('TRY_EXTJS'),
            timeout: 5000
        });
    },

    startEditing: function (item) {
       
        Ext.Msg.alert(i18next.t('TRY_EXTJS'), i18next.t('TRY_EXTJS'));
    }
});
