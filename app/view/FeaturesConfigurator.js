Ext.define('SenchaExample.view.FeaturesConfigurator', {
    extend: 'Ext.Panel',
    xtype: 'featuresconfigurator',
    bind: {
        title: '{i18n.FEATURES}',
    },
    requires: [
        'Ext.panel.Collapser',
        'Ext.panel.Resizer'
    ],
    width: 400,  // flex is not compatible w/stateful width
    ui: 'light',
    layout: 'vbox',
    platformConfig: {
        '!phone': {
            collapsible: 'right',
            resizable: {
                split: true,
                edges: 'west'
            },
            collapsed: true,
            stateId: 'FeaturesConfigurator',
            stateful: [
                'collapsed',
                'width'
            ]
        }
    },
    defaults: {
        // applied to each contained panel
        xtype: 'panel',
        bodyPadding: 10,
        ui: 'light'
    }
});