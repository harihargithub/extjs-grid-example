Ext.define('SenchaExample.view.grid.grouped.Grid', {
    extend: 'Ext.grid.TreeGrouped',
    alias: 'widget.groupedgrid',
    requires: [
        'Ext.grid.plugin.GroupingPanel',
        'Ext.grid.plugin.Summaries',
        'Ext.grid.filters.*'
    ],
    controller: 'groupedgridcontroller',
    viewModel: true,
    startCollapsed: false,
    summaryPosition: 'docked',
    groupSummaryPosition: 'top',
    groupHeaderTpl: '{name} ({group.length})',
    store: {
        model: 'Employee',
        autoLoad: true,
        sorters: [{
            property: 'joinDate',
            direction: 'DESC'
        }],
        //groupers: [
            // {
            //     property: 'joinDate',
            //     // you can provide a formatter that is used to create groups
            //     formatter: 'date("Y")'
            // },
            // {
            //     property: 'countryName'
            // },
            // {
            //     property: 'department'
            // }
        //],
        pageSize: 0,
        proxy: {
            type: 'ajax',
            limitParam: null,
            url: '/sencha-examples/api/employee',
        }
    },
    rowLines: true,
    columnLines: true,
    plugins: {
        groupingpanel: true,
        gridsummaries: true,
        gridviewoptions: true,
        grideditable: true,
        gridfilters: true,
    },
    itemConfig: {
        viewModel: {
            formulas: {
                isGroupRecord: function (get) {
                    if (get('record').get('employeeNo') == 0) {
                    }

                    return get('record').isGroup === true || get('record').isSummary === true;
                }
            }
        }
    },
    items: [{
        xtype: 'toolbar',
        docked: 'top',
        items: [{
            bind: {
                text: '{i18n.FILTERS}',
            },
            iconCls: 'x-fa fa-filter',
            xtype: 'button',
            reference: 'ShowFilters',
            menu: {
                listeners: {
                    beforeShow: 'onShowFilters',
                    beforeHide: 'onHideFilters'
                },
                items: [{
                    bind: {
                        text: '{i18n.ALL_FILTERS}',
                    },
                    reference: 'allFilter',
                    checked: true,
                    checkHandler: 'handleAllFilters'
                }, '-']
            }
        }]
    }],
    columns: [{
        menuDisabled: true,
        hideable: false,
        sortable: false,
        groupable: false,
        align: 'center',
        text: '<span class="x-fa fa-image"></span>',
        width: 58,
        cell: {
            xtype: 'widgetcell',
            encodeHtml: false,
            widget: {
                xtype: 'container',
                layout: 'center',
                items: [{
                    xtype: 'avatar',
                    bind: {
                        fullName: '{record.fullName}'
                    },
                    height: 30, // Set appropriate height
                    width: 30, // Set appropriate width
                }]
            }
        }
    },
    {
        bind: {
            text: '{i18n.NAME}',
        },
        dataIndex: 'fullName',
        filterType: 'string',
        minWidth: 150,
        flex: 1,
        sorter: {
            sorterFn: 'nameSorter' // set controller
        },
        groupable: true
    }, {
        groupable: true,
        ignore: true,
        bind: {
            text: '{i18n.AGE}',
        },
        editable: true,
        editor: {
            xtype: 'spinnerfield'
        },
        summary: 'average',
        formatter: 'number("0")',
        dataIndex: 'age',
        filterType: 'number',
        width: 80,
        align: 'center',
        cell: {
            encodeHtml: false
        },
        renderer: function (value, record, dataIndex, cell, column) {
            if (record && value) {
                if (record.get('age') < 18) {
                    cell.setBodyCls(['danger']);
                } else if (record.get('age') > 60) {
                    cell.setBodyCls(['warning'])
                } else {
                    cell.setBodyCls(['success']);
                }
            } else {
                cell.setBodyCls(null);
            }

            return value;
        }
    }, {
        bind: {
            text: '{i18n.COUNTRY}',
        },
        width: 200,
        dataIndex: 'countryName',
        groupable: true,
        filterType: 'string',
        cell: {
            encodeHtml: false
        },
        renderer: function (value, record, dataIndex, cell, column) {
            if (record && value) {
                return '<span><img src="/resources/shared/images/flags/w20/' + record.get("countryCode") + '.png" /> ' + record.get("countryName") + '</span>';
            } else {
                return "";
            }
        }
    }, {
        bind: {
            text: '{i18n.DEPARTMENT}',
        },
        dataIndex: 'department',
        groupable: true,
        filterType: 'string',
        flex: 1
    }, {
        xtype: 'datecolumn',
        bind: {
            text: '{i18n.JOIN_DATE}',
        },
        // you can provide a formatter that is used to create groups
        groupFormatter: 'date("Y")',
        dataIndex: 'joinDate',
        filterType: 'date',
        groupable: true,
        width: 115
    }, {
        bind: {
            text: '{i18n.EMAIL}',
        },
        editable: true,
        editor: {
            xtype: 'emailfield'
        },
        dataIndex: 'email',
        groupable: false,
        filterType: 'string',
        flex: 1
    }, {
        bind: {
            text: '{i18n.SALARY}',
        },
        cell: {
            encodeHtml: false
        },
        summary: 'sum',
        editable: true,
        editor: {
            xtype: 'numberfield'
        },
        dataIndex: 'salary',
        filterType: 'number',
        formatter: 'currency',
        width: 150,
        align: 'right'
    }]
});