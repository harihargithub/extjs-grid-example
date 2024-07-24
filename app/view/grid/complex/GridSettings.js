Ext.define('SenchaExample.view.grid.complex.GridSettings', {
    extend: 'Ext.Panel',
    xtype: 'complexgridsettings',
    bind: {
        title: '{i18n.SETTINGS}'
    },

    //controller: 'complexgridsettingscontroller',
    bodyPadding: 10,
    ui: 'light',
    items: [{
            xtype: 'togglefield',
            bind: {
                boxLabel: '{i18n.TOGGLE_GROUPING}'
            },
            margin: null,
            shadow: false,
            value: true,
            listeners: {
                change: 'onGroupGrid'
            }
        },
        {
            xtype: 'fieldset',
            bind: {
                title: '{i18n.FILTERING_OPTIONS}'
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'button',
                    bind: {
                        text: '{i18n.SHOW_FILTERS}'
                    },
                    handler: 'showFiltersHandler'
                }, {
                    xtype: 'button',
                    bind: {
                        text: '{i18n.CLEAR_FILTERS}'
                    },
                    handler: 'clearFilters'
                }]
            }, {
                xtype: 'togglefield',
                bind: {
                    boxLabel: '{i18n.TOGGLE_FILTERBAR}'
                },
                margin: null,
                shadow: false,
                value: true,
                listeners: {
                    change: 'onToggleFilterBarVisibility'
                }
            }]
        },
        {
            xtype: 'fieldset',
            bind: {
                title: '{i18n.SELECTABLE_OPTIONS}'
            },
            items: [{
                xtype: 'container',
                padding: '5 8',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    xtype: 'button',
                    margin: '0 10 0 0',
                },
                items: [{
                    bind: {
                        text: '{i18n.SELECTABLE}'
                    },
                    menu: {
                        defaults: {
                            xtype: 'menucheckitem',
                            checkHandler: 'onSelectableChange'
                        },
                        items: [{
                            fn: 'setRows',
                            checked: true,
                            bind: {
                                checked: '{isRows}',
                                text: '{i18n.ROWS}'
                            }
                        }, {
                            bind: {
                                text: '{i18n.CELLS}'
                            },
                            fn: 'setCells',
                            checked: true
                        }, {
                            bind: {
                                text: '{i18n.COLUMNS}'
                            },
                            fn: 'setColumns',
                            checked: true
                        }, {
                            bind: {
                                text: '{i18n.DRAG}'
                            },
                            fn: 'setDrag',
                            checked: true
                        }, {
                            fn: 'setCheckbox',
                            checked: true,
                            bind: {
                                text: '{i18n.CHECKBOX}',
                                checked: {
                                    bindTo: '{isRows}',
                                    twoWay: false
                                }
                            }
                        }]
                    }
                }, {
                    bind: {
                        text: '{i18n.EXTENSIBLE}',
                    },
                    menu: {
                        defaults: {
                            xtype: 'menuradioitem',
                            checkHandler: 'onExtensibleChange',
                            group: 'extensible'
                        },
                        items: [{
                            text: 'x',
                            value: 'x'
                        }, {
                            text: 'y',
                            value: 'y',
                            checked: true
                        }, {
                            bind: {
                                text: '{i18n.BOTH}'
                            },
                            value: true
                        }]
                    }
                }]
            }, {
                xtype: 'component',
                reference: 'status',
                docked: 'bottom',
                //cls: 'demo-solid-background',
                padding: '5 10',
                // html: 'No selection'
                bind: {
                    html: '{i18n.NO_SELECTION}'
                }
            }]
        }
    ]
});