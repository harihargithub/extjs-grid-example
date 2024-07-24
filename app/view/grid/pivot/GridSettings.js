Ext.define('SenchaExample.view.grid.pivot.GridSettings', {
    extend: 'Ext.Panel',
    xtype: 'pivotgridsettings',
    bind: {
        title: '{i18n.SETTINGS}',
    },
    bodyPadding: 10,
    items: [{
        xtype: 'fieldset',
        bind: {
            title: '{i18n.EXPAND}/{i18n.COLLAPSE}'
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
                margin: '0 10 0 0'
            },
            items: [{
                xtype: 'button',
                bind: {
                    text: '{i18n.EXPAND}/{i18n.ALL}'
                },
                handler: 'expandAll'
            }, {
                xtype: 'button',
                bind: {
                    text: '{i18n.COLLAPSE}/{i18n.ALL}'
                },
                handler: 'collapseAll'
            }]
        }]
    }, {
        xtype: 'fieldset',
        bind: {
            title: '{i18n.COLLAPIBLE_OPTIONS}'
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
                margin: '0 10 0 0'
            },
            items: [{
                bind: {
                    text: '{i18n.COLLAPSIBLE}'
                },
                menu: {
                    defaults: {
                        group: 'collapsible',
                        handler: 'reconfigureMatrix',
                        xtype: 'menuradioitem'
                    },
                    items: [{
                        checked: true,
                        bind: {
                            text: '{i18n.NONE}'
                        },
                        cfg: {
                            collapsibleRows: false,
                            collapsibleColumns: false
                        }
                    }, {
                        bind: {
                            text: '{i18n.ROWS_ONLY}'
                        },
                        cfg: {
                            collapsibleRows: true,
                            collapsibleColumns: false
                        }
                    }, {
                        bind: {
                            text: '{i18n.COLUMNS_ONLY}'
                        },
                        cfg: {
                            collapsibleRows: false,
                            collapsibleColumns: true
                        }
                    }, {
                        bind: {
                            text: '{i18n.ROWS_AND_COLUMNS}'
                        },
                        cfg: {
                            collapsibleRows: true,
                            collapsibleColumns: true
                        }
                    }]
                }
            }]
        }]
    }]
});