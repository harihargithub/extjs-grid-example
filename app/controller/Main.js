Ext.define('SenchaExample.controller.Main', {
    extend: 'Ext.app.Controller',
    alias: 'controller.main',
    refs: {
        cardPanel: '#cardPanel',
        contentPanel: 'contentPanel',
        // sourceOverlay: 'sourceoverlay',
        materialThemeMenuButton: '#materialThemeMenuButton'
    },

    control: {
        '#burgerButtonMenu': {
            beforeShow: 'beforeBurgerMenuShow'
        },
        '#materialThemeMenu': {
            beforeShow: 'beforeMaterialThemeMenuShow'
        },
        '#mainNavigationBar': {
            painted: {
                single: true,
                fn: 'onNavigationBarPainted'
            }
        }
    },
    listen: {
        global: {
            prefrescolorschemechanged: 'switchColorScheme'
        }
    },

    availableThemes: [{
        name: 'Material',
        profile: 'theme-material'
    }, {
        name: 'iOS',
        profile: 'theme-ios'
    }, {
        name: 'Triton',
        profile: 'theme-triton'
    }, {
        name: 'Neptune',
        profile: 'theme-neptune'
    }],

    availableLocales: [{
        separator: true,
        name: 'English',
        locale: 'en'
    }, {
        name: 'Português',
        locale: 'pt'
    },
    {
        name: 'Español',
        locale: 'es'
    }, {
        name: 'Français',
        locale: 'fr'
    }, {
        name: 'Italiano',
        locale: 'it'
    }, {
        name: 'Deutsch',
        locale: 'de'
    }
        // {
        //     name: 'Русский',
        //     locale: 'ru'
        // }
    ],

    materialThemes: [{
        text: 'America\'s Captain',
        baseColor: 'red',
        accentColor: 'blue'
    }, {
        text: 'Royal Appeal',
        baseColor: 'deep-purple',
        accentColor: 'indigo'
    }, {
        text: 'Creamsicle',
        baseColor: 'deep-orange',
        accentColor: 'grey'
    }, {
        text: 'Mocha Pop',
        baseColor: 'brown',
        accentColor: 'blue-grey'
    }, {
        text: 'Dry Shores',
        baseColor: 'blue-grey',
        accentColor: 'grey'
    }, {
        text: 'Bubble Gum',
        baseColor: 'pink',
        accentColor: 'light-blue'
    }, {
        text: '120° Compliments',
        baseColor: 'green',
        accentColor: 'deep-purple'
    }, {
        text: 'Roboto House',
        baseColor: 'grey',
        accentColor: 'blue-grey'
    }, {
        text: 'Daylight & Tungsten',
        baseColor: 'light-blue',
        accentColor: 'orange'
    }],

    init: function () {
        const computedStyles = window.getComputedStyle(document.body),
            darkModeProperty = computedStyles.getPropertyValue('--dark-mode'),
            darkMode = Ext.String.trim(darkModeProperty) === 'true',
            isDarkModePreferred = window.matchMedia('(prefers-color-scheme: dark)').matches;

        /**
         * In a build, the path to the `KitchenSink` namespace
         * is incorrect. Correct it here.
         */
        // if (Ext.ClassManager.paths.KitchenSink === 'app') {
        //     Ext.ClassManager.paths.KitchenSink = 'modern/src';
        // }
        this.switchColorScheme();

    },

    switchColorScheme: function () {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

        Ext.Viewport.getViewModel().set('darkMode',isDarkMode);
        Ext.getBody().toggleCls('dark-mode', isDarkMode);
        this.updateMaterialTheme(isDarkMode);
    },

    changeLocale: function (item) {
        var params = Ext.Object.fromQueryString(location.search);

        if (item.locale) {
            params.locale = item.locale;
        }
        else {
            delete params.locale;
        }

        params = '?' + Ext.Object.toQueryString(params).replace('modern=', 'modern');

        if (location.search === params) {
            location.reload();
        }
        else {
            location.search = params;
        }
    },

    changeProfile: function (item) {
        var params = Ext.Object.fromQueryString(location.search);

        if (item.profile) {
            params.profile = item.profile;
        }
        else {
            delete params.profile;
        }

        params = '?' + Ext.Object.toQueryString(params).replace('modern=', 'modern');

        if (location.search === params) {
            location.reload();
        }
        else {
            location.search = params;
        }
    },

    onNavigationBarPainted: function () {
        var materialThemeMenuButton = this.getMaterialThemeMenuButton();

        if (materialThemeMenuButton &&
            Ext.supports.CSSVariables &&
            Ext.theme.is.Material &&
            window.Fashion &&
            Fashion.css &&
            !!Fashion.css.setVariables
        ) {
            materialThemeMenuButton.show();
        }
    },

    beforeBurgerMenuShow: function (burgerMenu) {
        var me = this,
            items;
        if (!me.burgerActions) {
            items = me.getAvailableThemes();
            me.burgerActions = burgerMenu;
            burgerMenu.add(items);

        }
    },

    beforeMaterialThemeMenuShow: function (materialThemeMenu) {
        var me = this,
            items;

        if (this.materialThemeMenu) {
            return;
        }

        items = me.materialThemes.map(me.parseMaterialTheme(me));

        me.materialThemeMenu = materialThemeMenu;

        items.unshift({
            xtype: 'togglefield',
            listeners: {
                change: 'onDarkModeChange',
                scope: me
            },
            //value: Ext.String.trim(window.getComputedStyle(document.body).getPropertyValue('--dark-mode')) === 'true',
            bind:{
                value: '{darkMode}',
                boxLabel: '{i18n.DARK_MODE}',
            },
            
            margin: null,
            shadow: false
        });

        items.push({
            bind:{
                text: '{i18n.CANCEL}',
            },
            ui: 'decline',
            handler: function () {
                materialThemeMenu.hide();
            },
            separator: true
        });

        materialThemeMenu.add(items);
    },

    onDarkModeChange: function (toggle) {
        var me = this,
            darkMode = toggle.getValue();

        me.updateMaterialTheme(darkMode);
        Ext.getBody().toggleCls('dark-mode', darkMode);
    },

    getAvailableThemes: function () {
        var me = this,
            items = me.availableThemes.map(me.parseAvailableThemes(me));

        items.unshift({
            xtype: 'menuradioitem',
            group: 'theme_chooser',
            handler: me.changeProfile,
            scope: me,
            text: 'Auto Detect Theme'
        });

        return items.concat(me.getAvailableLocales());
        // return items;
    },

    parseAvailableThemes: function (me) {
        return function (theme) {
            theme.xtype = 'menuradioitem';
            theme.checked = Ext.theme.name === theme.name;
            theme.group = 'theme_chooser';
            theme.handler = me.changeProfile;
            theme.scope = me;
            theme.text = theme.name + ' Theme';

            return theme;
        };
    },

    parseMaterialTheme: function (me) {
        return function (theme) {
            theme.scope = me;
            theme.handler = me.onMaterialThemeClick;

            return theme;
        };
    },

    onMaterialThemeClick: function (item) {
        var me = this,
            darkMode = Ext.String.trim(window.getComputedStyle(document.body).getPropertyValue('--dark-mode')) === 'true';

        me.updateMaterialTheme(darkMode, item.baseColor, item.accentColor);
    },

    updateMaterialTheme: function (darkMode, base, accent) {
        var me = this;

        if (Ext.theme.Material) {
            Ext.theme.Material.setColors({
                'darkMode': darkMode,
                'base': base || me._materialBaseColor,
                'accent': accent || me._materialAccentColor
            });
        }

        if (base) {
            me._materialBaseColor = base;
        }

        if (accent) {
            me._materialAccentColor = accent;
        }
    },

    getAvailableLocales: function () {
        var me = this,
            items = me.availableLocales.map(me.parseAvailableLocales(me));
        return items;
    },

    parseAvailableLocales: function (me) {

        return function (locale) {
            locale.xtype = 'menuradioitem';
            locale.checked = SenchaExample.locale === locale.locale;
            locale.group = 'locale_chooser';
            locale.handler = me.changeLocale;
            locale.scope = me;
            locale.text = locale.name;

            return locale;
        };
    }

    
});