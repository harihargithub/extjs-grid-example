Ext.define('SenchaExample.controller.tablet.Main', {
    extend: 'SenchaExample.controller.Main',

    getAvailableThemes: function () {
        var items = this.callParent();

        items.push({
            bind: {
                text: '{i18n.REACT_EXAMPLE}',
            },
            iconCls: 'x-fab fa-react',
            separator: true,
            handler: function () {
                window.open('https://www.sencha.com/reactgrid', '_blank');
            }
        });

        items.push({
            bind: {
                text: '{i18n.ABOUT}',
            },
            iconCls: 'x-fa fa-info',
            separator: true,
            handler: 'onAboutHandler'
        });
        items.push({
            bind: {
                text: '{i18n.DOCUMENTATION}',
            },
            iconCls: 'x-fa fa-file',
            href: 'https://docs.sencha.com/extjs/latest/',
            target: '_blank'
        });
        items.push({
            bind: {
                text: '{i18n.COMMUNITY}',
            },
            iconCls: 'x-fab fa-discord',
            href: 'https://discord.gg/RfxMGSbHXT',
            target: '_blank'
        });
        items.push({
            text: 'GitHub',
            iconCls: 'x-fab fa-github',
            href: 'https://github.com/sencha-extjs-examples/extjs-grid-example',
            target: '_blank'
        });

        return items;
    }
});