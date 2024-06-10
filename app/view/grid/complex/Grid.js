Ext.define('SenchaExample.view.grid.complex.Grid', {
    extend: 'Ext.grid.Grid',
    xtype: 'complexgrid',
    controller: 'complexgridcontroller',

    requires: [
        'Ext.data.summary.Average',
        'Ext.data.validator.Format',
        'Ext.grid.plugin.CellEditing',
        'Ext.grid.filters.Plugin',
        'Ext.grid.plugin.Editable',
        'Ext.grid.plugin.ViewOptions',
        'Ext.grid.plugin.PagingToolbar',
        'Ext.grid.plugin.SummaryRow',
        'Ext.grid.plugin.ColumnResizing',
        'Ext.grid.plugin.MultiSelection',
        'Ext.grid.plugin.RowExpander',
        'Ext.grid.plugin.Exporter',
        'Ext.data.validator.Bound',
        'Ext.sparkline.Line',
        'Ext.ux.rating.Picker',
        'Ext.grid.plugin.filterbar.FilterBar',
        'Ext.grid.plugin.RowDragDrop',
        'Ext.grid.plugin.Clipboard',
        'Ext.dataview.plugin.ListPaging',
        'Ext.grid.rowedit.Plugin'
    ],
    store: {
        model: 'Employee',
        autoLoad: true,
        groupField: 'department',
        pageSize: 0,
        remoteSort: true,
        proxy: {
            type: 'ajax',
            url: '/sencha-examples/api/employee',
            reader: {
                type: 'json',
                rootProperty: 'data',
                // Do not attempt to load orders inline.
                // They are loaded through the proxy
            }
        },
        sorters: [{
            property: 'countryName',
            direction: 'DESC'
        }]
        // filters: [{
        //     property: 'fullName',
        //     operator: '==',
        //     value: 'Marlie Lowery'
        // }]
    },

    helperTpl: [
        '<ul>',
        '<tpl for="group.data.items">',
        '<li>{data.fullName:htmlEncode}</li>',
        '</tpl>',
        '</ul>'
    ],

    groupHeader: {
        tpl: [
            '<tpl if="groupField == \'countryName\'">',
            '<img src="/resources/shared/images/flags/w20/{[values.children[0].data["countryCode"]]}.png"/>',
            '</tpl> ',
            '<tpl if="groupField == \'color\'">',
            '<span style="color: {[values.children[0].data["color"]]};" class="x-fa fa-tshirt"></span>',
            '</tpl> ',
            '{name} ({count})'
        ],
        // Item headers can also have tools.
        tools: {
            print: {
                handler: 'onGroupPrint',
                bind: {
                    tooltip: '{i18n.PRINT_GROUP}'
                },
                // Item headers have "start" (the default),
                // "end" and "tail" zones:
                zone: 'tail'
            },
            chart: {
                xtype: 'button',
                iconCls: 'x-fa fa-chart-bar',
                arrow: false,
                bind: {
                    tooltip: '{i18n.CHARTS}'
                },
                // Item headers have "start" (the default),
                // "end" and "tail" zones:
                zone: 'tail',
                menu: {
                    items: [{
                        text: 'Pie',
                        menu: [{
                            text: 'Pie',
                            handler: 'onChartGroup',
                            senchaChartConfig: {
                                xtype: 'piechartexample',
                                bind: {
                                    store: '{salaries}',
                                    // theme: '{menuGroups.charttheme}'
                                },
                                theme: 'custom-theme',
                            },
                            fusionChartsConfig: {
                                //TODO - Phase 2
                            }
                        }, {
                            text: 'Donut',
                            handler: 'onChartGroup',
                            senchaChartConfig: {
                                xtype: 'donutpiechartexample',
                                bind: {
                                    store: '{salaries}'
                                },
                                theme: 'custom-theme',
                            },
                            fusionChartsConfig: {
                                //TODO - Phase 2
                            }
                        }]
                    }, {
                        text: 'Bar',
                        handler: 'onChartGroup',
                        senchaChartConfig: {
                            xtype: 'barchartexample',
                            bind: {
                                store: '{salaries}'
                            },
                            theme: 'custom-theme',
                        },
                        fusionChartsConfig: {
                            //TODO - Phase 2
                        }
                    }, {
                        text: 'Column',
                        handler: 'onChartGroup',
                        senchaChartConfig: {
                            xtype: 'columnchartexample',
                            bind: {
                                store: '{salaries}'
                            },
                            theme: 'custom-theme',
                        },
                        fusionChartsConfig: {
                            //TODO - Phase 2
                        }
                    }, {
                        text: 'Line',
                        handler: 'onChartGroup',
                        senchaChartConfig: {
                            xtype: 'linechartexample',
                            bind: {
                                store: '{salaries}'
                            },
                            theme: 'custom-theme',
                        },
                        fusionChartsConfig: {
                            //TODO - Phase 2
                        }
                    }, {
                        text: 'More Sencha Ext JS Charts examples',
                        href: 'https://examples.sencha.com/extjs/latest/examples/kitchensink/?modern#charts',
                        target: '_blank',
                        separator: true,
                        clickHideDelay: 10
                    }, {
                        text: 'Go to fusioncharts.com',
                        href: 'https://www.fusioncharts.com/',
                        target: '_blank',
                        separator: true,
                        clickHideDelay: 10
                    }]
                }
            },

            save: {
                handler: 'onGroupSave',
                bind: {
                    tooltip: '{i18n.SAVE_GROUP}'
                },
                weight: -1
            },

            refresh: {
                handler: 'onGroupRefresh',
                bind: {
                    tooltip: '{i18n.REFRESH_GROUP}'
                }
            }
        }
    },
    grouped: true,
    rowLines: true,
    rowNumbers: false,
    columnLines: true,
    variableHeights: true,
    selectable: {
        // Disables sorting by header click, though it will be still available via menu
        columns: true,
        cells: false,
        checkbox: true,
        drag: false,
        checkboxColumnIndex: 0
    },
    platformConfig: {
        'desktop': {
            plugins: {
                cellediting: true,
                gridviewoptions: true, //Does not work with Locked grid
                summaryrow: true,
                rowexpander: true,
                gridexporter: true,
                gridfilterbar: true,
                // Propagates numeric values when the selection is extended in the Y axis
                clipboard: true,
                selectionreplicator: true
            }
        },
        '!desktop': {
            plugins: {
                grideditable: true,
                gridexporter: true,
                gridviewoptions: true,
                rowexpander: true,
                gridexporter: true,
                gridfilterbar: true,
                gridrowdragdrop: {
                    dragIcon: true,
                    listeners: {
                        drop: 'onDropRow'
                    }
                }
            }
        }
    },
    listeners: {
        documentsave: 'onDocumentSave',
        beforedocumentsave: 'onBeforeDocumentSave',
        columnmenucreated: 'onColumnMenuCreated',
    },

    items: [{
        xtype: 'toolbar',
        shadow: false,
        docked: 'top',
        items: [{
            xtype: 'button',
            ui: 'primary',
            bind: {
                text: '{i18n.NEW}',
                tooltip: '{i18n.TOOLTIP_EXAMPLE}'
            },
            handler: 'onAddButtonTap'
        }, {
            xtype: 'spacer'
        }, {
            xtype: 'button',
            bind: {
                text: '{i18n.EXPORT}'
            },
            stretchMenu: true,
            arrow: false,
            menu: {
                defaults: {
                    handler: 'exportDocument'
                },
                indented: false,
                items: [{
                    text: 'Excel xlsx',
                    cfg: {
                        type: 'excel07',
                        ext: 'xlsx',
                        includeGroups: true,
                        includeSummary: true
                    }
                }, {
                    text: 'Excel xml',
                    cfg: {
                        type: 'excel03',
                        ext: 'xml',
                        includeGroups: true,
                        includeSummary: true
                    }
                }, {
                    text: 'CSV',
                    cfg: {
                        type: 'csv'
                    }
                }, {
                    text: 'TSV',
                    cfg: {
                        type: 'tsv',
                        ext: 'csv'
                    }
                }, {
                    text: 'HTML',
                    cfg: {
                        type: 'html',
                        includeGroups: true,
                        includeSummary: true
                    }
                }]
            }
        }]
    }],

    // Instruct rows to create view models so we can use data binding
    itemConfig: {
        viewModel: {
            type: 'complexgridrowmodel'
        },
        body: {
            tpl: [
                '<img src="{avatar}" height="100px" style="float:left;margin:0 10px 5px 0">',
                '<b>{name}<br></b>{dob:date}<br> {bio}'
            ]
        }
    },

    groupFooter: {
        xtype: 'gridsummaryrow',
        viewModel: {
            type: 'complexgridrowmodel'
        }
    },

    columns: [{
        menuDisabled: true,
        hideable: false,
        sortable: false,
        groupable: false,
        align: 'center',
        text: '<span class="x-fa fa-image"></span>',
        ignoreExport: true,
        ignore: true,
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
        sorter: {
            sorterFn: 'nameSorter' // set controller
        },
        groupable: true,
    }, {
        bind: {
            text: '{i18n.AGE}',
        },
        dataIndex: 'age',
        filterType: 'number',
        editable: true,
        width: 80,
        align: 'center',
        cell: {
            encodeHtml: false
        },
        summary: 'average',
        formatter: 'number(0)',
        exportStyle: {
            format: 'General Number',
            alignment: {
                horizontal: 'Right'
            }
        }
    }, {
        bind: {
            text: '{i18n.COUNTRY}',
        },
        width: 180,
        dataIndex: 'countryName',
        groupable: true,
        filterType: 'list',
        editable: false,
        cell: {
            encodeHtml: false
        },
        // summaryRenderer: null,
        renderer: function (value, record, dataIndex, cell, column) {
            return '<span><img src="/resources/shared/images/flags/w20/' + record.get('countryCode') + '.png" /> ' + record.get('countryName') + '</span>';
        }
    }, {
        bind: {
            text: '{i18n.DEPARTMENT}',
        },
        dataIndex: 'department',
        width: 140,
        groupable: true,
        filterType: 'string'
    }, {
        bind: {
            text: '{i18n.PROGRESS}',
        },
        width: 150,
        ignoreExport: true,
        ignore: true,
        align: 'center',
        dataIndex: 'progress',
        cell: {
            xtype: "widgetcell",
            widget: {
                xtype: 'sectorprogress',
                sectors: [{
                    end: 10,
                    ui: 'danger'
                }, {
                    end: 60,
                    ui: 'warning'
                }, {
                    end: 100,
                    ui: 'success'
                }],
                textTpl: [
                    '{percent:number("0")}%' // Optional text template to display percentage
                ],
                bind: {
                    hidden: '{record.isSummary}',
                    value: '{record.progress}'
                }
            }
        }
    }, {
        xtype: 'checkcolumn',
        headerCheckbox: true,
        dataIndex: 'verified',
        filterType: 'boolean',
        ignoreExport: false,
        ignore: true,
        width: 90,
        bind: {
            text: '{i18n.VERIFIED}',
        },
        cell: {
            xtype: 'checkcell'
        },
    }, {
        bind: {
            text: '{i18n.LINK}',
        },
        width: 80,
        align: 'center',
        dataIndex: 'link',
        summary: null,
        cell: {
            encodeHtml: false
        },
        tpl: [
            '<tpl if="employeeNo != 0">',
            '<a target="_blank" href="https://sencha.com">Click me</a>',
            '</tpl>'
        ]
    }, {
        bind: {
            text: '{i18n.RATINGS}',
        },
        columns: [{
            bind: {
                text: '{i18n.AVERAGE}',
            },
            xtype: 'numbercolumn',
            dataIndex: 'averageRating',
            filterType: 'number',
            // We can average even calculated fields here:
            summary: 'average',
            width: 75,
            cell: {
                cls: 'big-data-ratings-cell',
                bind: {
                    bodyCls: '{ratingGroup:pick("under4","under5","under6","over6")}'
                }
            },
            exportStyle: {
                format: 'Standard',
                alignment: {
                    horizontal: 'Right'
                }
            }
        }, {
            bind: {
                text: '{i18n.ALL}',
            },
            dataIndex: 'rating',
            align: 'center',
            ignoreExport: true,
            cell: {
                xtype: 'widgetcell',
                forceWidth: true,
                widget: {
                    xtype: 'sparklineline'
                }
            }
        }]
    }, {
        bind: {
            text: '{i18n.JOIN_DATE}',
        },
        dataIndex: 'joinDate',
        filterType: 'date',
        editable: true,
        xtype: 'datecolumn',
        width: 115,
        // you can define an export style for a column
        // you can set alignment, format etc
        exportStyle: [{
            // no type key is defined here which means that this is the default style
            // that will be used by all exporters
            format: 'Medium Date',
            alignment: {
                horizontal: 'Right'
            }
        }, {
            // the type key means that this style will only be used by the csv exporter
            // and for all others the default one, defined above, will be used
            type: 'csv',
            format: 'Short Date'
        }]
    }, {
        bind: {
            text: '{i18n.SLIDER_BOUND_TO_AGE}',
        },
        width: 120,
        ignoreExport: true,
        align: 'center',
        groupable: false,
        cell: {
            xtype: 'widgetcell',
            widget: {
                xtype: 'sliderfield',
                margin: 5,
                bind: {
                    hidden: '{record.isSummary}',
                    value: '{record.age}'
                },
            }
        }
    }, {
        bind: {
            tooltip: '{i18n.COLOR}',
        },
        text: '<span class="x-fa fa-tshirt"></span>',
        width: 110,
        editable: true,
        dataIndex: 'color',
        // hidden: true,
        editor: {
            xtype: 'colorfield'
        },
        ignoreExport: false,
        align: 'center',
        groupable: true,
        renderer: function (value, record, dataIndex, cell, column) {
            return '<span style="color:' + record.get('color') + ';" class="x-fa fa-tshirt"></span>';
        },
        cell: {
            encodeHtml: false
        }
    }, {
        bind: {
            text: '{i18n.NOTICE_PERIOD}',
        },
        width: 120,
        dataIndex: 'noticePeriod',
        filterType: 'string',
        editable: true
    }, {
        bind: {
            text: '{i18n.EMAIL}',
        },
        dataIndex: 'email',
        filterType: 'string',
        editable: true,
        editor: {
            xtype: 'emailfield'
        },
        width: 250
    }, {
        bind: {
            text: '{i18n.ABSENCES}',
        },
        defaults: {
            exportStyle: {
                alignment: {
                    horizontal: 'Center'
                }
            }
        },
        columns: [{
            xtype: 'numbercolumn',
            // text: 'Illness',
            bind: {
                text: '{i18n.ILLNESS}',
            },
            dataIndex: 'sickDays',
            filterType: 'number',
            align: 'center',
            format: '0'
        }, {
            xtype: 'numbercolumn',
            bind: {
                text: '{i18n.HOLIDAYS}',
            },
            dataIndex: 'holidayDays',
            filterType: 'number',
            align: 'center',
            format: '0'
        }, {
            bind: {
                text: '{i18n.HOLIDAY_ALLOWANCE}',
            },
            dataIndex: 'holidayAllowance',
            filterType: 'number',
            align: 'center',
            formatter: 'number("0.00")'
        }]
    }, {
        bind: {
            text: '{i18n.RATING_THIS_YEAR}',
        },
        dataIndex: 'ratingThisYear',
        formatter: 'round(1)',
        summary: 'average',
        // Adjust the header text when grouped by this column:
        groupHeaderTpl: '{value:repeat("★")} ({value:plural("Star")})',
        cell: {
            xtype: 'widgetcell',
            widget: {
                xtype: 'rating',
                bind: {
                    hidden: '{record.isSummary}'
                }
                //tip: i18next.t('SET_TO') + ' {tracking:plural("Star")}'
            }
        },
        exportStyle: {
            alignment: {
                horizontal: 'Right'
            }
        }
    }, {
        bind: {
            text: '{i18n.SALARY}',
        },
        dataIndex: 'salary',
        filterType: 'number',
        formatter: 'usMoney',
        editor: {
            xtype: 'numberfield',
            validators: [
                { type: 'bound', max: 1e7, min: 1e4 }
            ]
        },
        width: 150,
        align: 'right',
        summary: 'average',
        summaryRenderer: 'salarySummaryRenderer',

        exportStyle: {
            format: 'Currency',
            alignment: {
                horizontal: 'Right'
            }
        }
    }, {
        text: '',
        width: 100,
        ignoreExport: true,
        align: 'center',
        cell: {
            xtype: 'widgetcell',
            widget: {
                xtype: 'button',
                ui: 'info',
                bind: {
                    text: '{i18n.VERIFY}',
                    tooltip: '{i18n.VERIFY} {record.fullName}',
                    //hidden: '{record.isSummary}'
                    //ui: '{record.status}'
                },
                handler: 'onVerifyTap'
            }
        },
        // Summary rows do not create widgetcells unless set as
        // the summaryCell
        summaryCell: {
            xtype: 'widgetcell',
            widget: {
                xtype: 'button',
                ui: 'green',
                text: 'All',
                handler: 'onVerifyAllTap'
            }
        }
    }, {
        bind: {
            text: '{i18n.ACTIONS}',
        },
        width: 80,
        ignoreExport: true,
        cell: {
            bind: {
                hidden: '{record.isSummary}'
            },
            tools: {
                menu: 'onMenu',
                gear: {
                    handler: 'onGear',
                    // tooltip: 'Change settings...',

                    // Cells offer a start or end "zone" for tools:
                    zone: 'end',

                    // Use record binding for dynamic configuration:
                    bind: {
                        disabled: '{record.age < 18}',
                        //TODO Add a formula
                        tooltip: '{changeSettings}'
                    }
                }
            }
        }
    }],

    toolContextMenu: { // used by Controller
        xtype: 'menu',
        anchor: true,
        padding: 10,
        minWidth: 150,
        viewModel: {},
        items: [
            {
                xtype: 'avatar',
                bind: {
                    fullName: '{record.fullName}'
                },
                height: 80, // Set appropriate height
                width: 80, // Set appropriate width
            }, {
                bind: {
                    text: '{i18n.EDIT}',
                },
                separator: true,
                margin: '10 0 0',
                handler: 'startEditing',
                iconCls: 'x-fa fa-cog'
            }, {
                bind: {
                    text: '{i18n.SHARE}',
                },
                handler: 'tryExtJS',
                margin: '10 0 0',
                iconCls: 'x-far fa-share-square'
            }, {
                bind: {
                    text: '{i18n.RATE_SPEAKER}',
                },
                handler: 'tryExtJS',
                margin: '10 0 0',
                iconCls: 'x-fa fa-star'
            }]
    }
});