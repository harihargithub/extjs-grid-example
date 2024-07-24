

Ext.define('SenchaExample.view.grid.pivot.Grid', {
    extend: 'Ext.pivot.Grid',
    xtype: 'complexpivotgrid',
    requires: [
        'Ext.pivot.plugin.Exporter',
        'Ext.pivot.plugin.Configurator',
        'Ext.pivot.plugin.DrillDown',
        'Ext.pivot.plugin.RangeEditor'
    ],
    controller: 'pivotgridcontroller',
    selModel: {
        type: 'cellmodel'
    },
    selectable: {
        cells: true
    },

    /**
     * Example that shows how to style the pivot grid results using ViewModels on row level (itemConfig).
     *
     * Inside the bind on itemConfig you can define templates or formulas. The following data is
     * available:
     *
     * - record:
     *      - isRowGroupHeader
     *      - isRowGroupTotal
     *      - isRowGrandTotal
     *      - leftAxisKey
     */
    itemConfig: {
        viewModel: {
            // use a default viewModel when using bind templates
            type: 'default'
            // or a user defined viewModel when using bind formulas
            // type: 'pivot-row-model'
        },
        bind: {
            // bind template usage
            userCls: '{record.isRowGrandTotal ? "pivotRowGrandTotal" : (record.isRowGroupHeader ? "pivotRowHeader" : (record.isRowGroupTotal ? "pivotRowTotal" : ""))}'
            // or bind formula
            // userCls: '{rowStyle}'
        }
    },

    // Use this config to apply a rule to all cells generated for aggregate dimensions
    // Or use `leftAxisCellConfig` to apply a rule to all cells generated for leftAxis
    // dimensions
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
        pivotexporter: true,
        pivotconfigurator: true
    },
    // Set this to false if multiple dimensions are configured on leftAxis and
    // you want to automatically expand the row groups when calculations are ready.
    startRowGroupsCollapsed: true,
    // Set this to false if multiple dimensions are configured on topAxis and
    // you want to automatically expand the col groups when calculations are ready.
    startColGroupsCollapsed: true,
    matrix: {
        type: 'local',
        store: {
            model: 'Sale',
            autoLoad: true,
            proxy: {
                // load using HTTP
                type: 'ajax',
                limitParam: null,
                url: '/sencha-examples/api/salesdata',
                // the return will be JSON, so lets set up a reader
                reader: {
                    type: 'json'
                }
            }
        },
        calculateAsExcel: true,
        rowSubTotalsPosition: 'last',
        // change the width of the column generated for all left axis dimensions
        // Set layout type to "compact". If this config is missing then the
        // default layout is "outline"
        // Configure the aggregate dimensions. Multiple dimensions
        // are supported.
        aggregate: [{
            dataIndex: 'value',
            header: 'Total',
            aggregator: 'sum',
            width: 120,
            exportStyle: [{
                // no type key is defined here which means that this is the
                // default style that will be used by all exporters
                format: 'Currency',
                alignment: {
                    horizontal: 'Right'
                }
            }, {
                // the type key means that this style will only be used by the
                // html exporter and for all others the default one, defined
                // above, will be used
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

        // Configure the left axis dimensions that will be used to generate
        // the grid rows
        leftAxis: [{
            dataIndex: 'person',
            header: 'Person',
            // bind: {
            //     header: '{i18n.{PERSON}}',
            // },
            // You can also define here a `cellConfig` for binding
            // This is used only when `viewLayoutType` is `outline`
            cellConfig: {
                viewModel: {
                    type: 'default'
                },
                bind: {
                    userCls: '{record.isRowGroupHeader:pick("","pivotCellGroupHeader")}'
                }
            },
            
        }, {
            dataIndex: 'company',
            header: 'Company',
            // bind: {
            //     header: '{i18n.COMPANY}',
            // },
            width: 130,
            sortable: false,
        }, {
            dataIndex: 'country',
            header: 'Country',
            // bind: {
            //     header: '{i18n.COUNTRY}',
            // },
            width: 130,
            labelRenderer: function (countryName) {
                return '<span class="pivot-grid-group-title">' + countryName + '</span>';
            }
        }],

        /**
         * Configure the top axis dimensions that will be used to generate
         * the columns.
         *
         * When columns are generated the aggregate dimensions are also used.
         * If multiple aggregation dimensions are defined then each top axis
         * result will have in the end a column header with children columns
         * for each aggregate dimension defined.
         */
        topAxis: [{
            dataIndex: 'year',
            header: 'Year',
            // bind: {
            //     header: '{i18n.YEAR}',
            // },
            //labelRenderer: 'yearLabelRenderer'
        }, {
            dataIndex: 'month',
            // bind: {
            //     header: '{i18n.MONTH}',
            // },
            header: 'Month',
            labelRenderer: 'monthLabelRenderer'
        }]
    },
    listeners: {
        // this event notifies us when the document was saved
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
                text: '{i18n.CONFIGURATOR}',
            },
            handler: 'showConfigurator',
            align: 'right',
            xtype: 'button',
        }, {
            align: 'right',
            xtype: 'button',
            bind: {
                text: '{i18n.EXPORT}',
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
    }]
});