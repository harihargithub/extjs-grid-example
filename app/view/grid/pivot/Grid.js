import PivotTable from '@nebula.js/sn-pivot-table';

Ext.define('SenchaExample.view.grid.pivot.Grid', {
    extend: 'Ext.Component',
    xtype: 'complexpivotgrid',
    requires: [
        // Removed 'Ext.grid.plugin.Grouping'
    ],
    controller: 'pivotgridcontroller',
    selModel: {
        type: 'cellmodel'
    },
    selectable: {
        cells: true
    },
    itemConfig: {
        viewModel: {
            type: 'default'
        },
        bind: {
            userCls: '{record.isRowGrandTotal ? "pivotRowGrandTotal" : (record.isRowGroupHeader ? "pivotRowHeader" : (record.isRowGroupTotal ? "pivotRowTotal" : ""))}'
        }
    },
    topAxisCellConfig: {
        viewModel: {
            type: 'pivot-cell-model'
        },
        bind: {
            userCls: '{cellStyle}'
        }
    },
    enableLocking: true,
    bufferedRenderer: true,
    leadingBufferZone: 100,
    trailingBufferZone: 100,
    plugins: {
        pivotdrilldown: true,
        pivotconfigurator: true
    },
    startRowGroupsCollapsed: true,
    startColGroupsCollapsed: true,
    matrix: {
        type: 'local',
        store: {
            model: 'Sale',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                limitParam: null,
                url: '/sencha-examples/api/salesdata',
                reader: {
                    type: 'json'
                }
            }
        },
        calculateAsExcel: true,
        rowSubTotalsPosition: 'last',
        aggregate: [{
            dataIndex: 'value',
            header: 'Total',
            aggregator: 'sum',
            width: 120,
            exportStyle: [{
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                }
            }, {
                type: 'html',
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                },
                font: {
                    italic: true,
                    bold: true
                }
            }]
        }],
        leftAxis: [{
            dataIndex: 'person',
            header: 'Person',
            cellConfig: {
                viewModel: {
                    type: 'default'
                },
                bind: {
                    userCls: '{record.isRowGroupHeader:pick("","pivotCellGroupHeader")}'
                }
            }
        }, {
            dataIndex: 'company',
            header: 'Company',
            width: 130,
            sortable: false
        }, {
            dataIndex: 'country',
            header: 'Country',
            width: 130,
            labelRenderer: function (countryName) {
                return '<span class="pivot-grid-group-title">' + countryName + '</span>';
            }
        }],
        topAxis: [{
            dataIndex: 'year',
            header: 'Year'
        }, {
            dataIndex: 'month',
            header: 'Month',
            labelRenderer: 'monthLabelRenderer'
        }]
    },
    listeners: {
        documentsave: 'onDocumentSave',
        beforedocumentsave: 'onBeforeDocumentSave',
        pivotgroupexpand: 'onPivotGroupExpand',
        pivotgroupcollapse: 'onPivotGroupCollapse',
        pivotitemtap: 'onPivotItemTap'
    },
    items: [{
        xtype: 'toolbar',
        shadow: false,
        docked: 'top',
        items: [{
            xtype: 'spacer'
        }, {
            bind: {
                text: '{i18n.CONFIGURATOR}'
            },
            handler: 'showConfigurator',
            align: 'right',
            xtype: 'button'
        }, {
            align: 'right',
            xtype: 'button',
            bind: {
                text: '{i18n.EXPORT}'
            },
            stretchMenu: true,
            arrow: false,
            menu: {
                defaults: {
                    handler: 'exportDocument',
                    iconCls: 'x-far fa-file-alt'
                },
                indented: false,
                items: [{
                    text: 'Excel xlsx (pivot table definition)',
                    iconCls: 'x-far fa-file-excel',
                    cfg: {
                        type: 'pivotxlsx',
                        matrix: true,
                        fileName: 'ExportPivot.xlsx'
                    }
                }, {
                    text: 'Excel xlsx (all items)',
                    iconCls: 'x-far fa-file-excel',
                    cfg: {
                        type: 'excel07',
                        fileName: 'ExportAll.xlsx'
                    }
                }, {
                    text: 'Excel xlsx (visible items)',
                    iconCls: 'x-far fa-file-excel',
                    cfg: {
                        type: 'excel07',
                        fileName: 'ExportVisible.xlsx',
                        onlyExpandedNodes: true
                    }
                }, {
                    text: 'Excel xml (all items)',
                    iconCls: 'x-far fa-file-excel',
                    cfg: {
                        type: 'excel03',
                        fileName: 'ExportAll.xml'
                    }
                }, {
                    text: 'Excel xml (visible items)',
                    iconCls: 'x-far fa-file-excel',
                    cfg: {
                        type: 'excel03',
                        fileName: 'ExportVisible.xml',
                        onlyExpandedNodes: true
                    }
                }, {
                    text: 'CSV (all items)',
                    cfg: {
                        type: 'csv',
                        fileName: 'ExportAll.csv'
                    }
                }, {
                    text: 'CSV (visible items)',
                    cfg: {
                        type: 'csv',
                        fileName: 'ExportVisible.csv',
                        onlyExpandedNodes: true
                    }
                }, {
                    text: 'TSV (all items)',
                    cfg: {
                        type: 'tsv',
                        fileName: 'ExportAll.csv'
                    }
                }, {
                    text: 'TSV (visible items)',
                    cfg: {
                        type: 'tsv',
                        fileName: 'ExportVisible.csv',
                        onlyExpandedNodes: true
                    }
                }, {
                    text: 'HTML (all items)',
                    iconCls: 'x-fab fa-html5',
                    cfg: {
                        type: 'html',
                        fileName: 'ExportAll.html'
                    }
                }, {
                    text: 'HTML (visible items)',
                    iconCls: 'x-fab fa-html5',
                    cfg: {
                        type: 'html',
                        fileName: 'ExportVisible.html',
                        onlyExpandedNodes: true
                    }
                }]
            }
        }]
    }],
    initComponent: function() {
        // Removed this.callParent(arguments);

        // Initialize the PivotTable
        const pivotTable = new PivotTable({
            element: this.el.dom,
            // Add your PivotTable configuration here
        });

        // Store the PivotTable instance for later use
        this.pivotTable = pivotTable;
    }
});