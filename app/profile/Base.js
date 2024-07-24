Ext.define('SenchaExample.profile.Base', {
    extend: 'Ext.app.Profile',

    launch: async function () {
        var isBenchmarking = window.location.search.match(/(\?|&)bm/);

        if (isBenchmarking) {
            Ext.Animator.on({
                animationend: 'onAnimationEnd',
                scope: this
            });

            this.benchmark = Ext.Viewport.add({
                style: 'background-color: red; color: #FFF',
                bottom: 0,
                right: 0,
                zIndex: 1000
            });
        }

        Splashscreen.show('Sencha', 'Ext JS Grid Example');

        await Localization.init();

        i18next.changeLanguage(SenchaExample.locale);
    },

    onAnimationEnd: function (animator, animation, element) {
        var delay = (Date.now() - animation.startTime) - animation.getDuration(),
            benchmark = this.benchmark,
            item;

        item = benchmark.add({
            html: element.id + ' <b>' + delay + '</b>'
        });

        setTimeout(function () {
            item.destroy();
        }, 5000);
    }
});