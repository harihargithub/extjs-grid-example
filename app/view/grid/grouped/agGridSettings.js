Ext.define('SenchaExample.view.grid.grouped.agGridSettings', {
    extend: 'Ext.Panel',
    xtype: 'groupedaggridsettings',
    bind: {
        title: '{i18n.SETTINGS}'
    },

    controller: 'groupedaggridcontroller',
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
        }
    ]
});