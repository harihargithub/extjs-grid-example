Ext.define('SenchaExample.ux.SectorProgress', {
    extend: 'Ext.Progress',
    alias: 'widget.sectorprogress',

    config: {
        sectors: []
    },

    privates: {
        applySector: function (percent) {
            var me = this,
                sectors = me.getSectors(),
                sector;

            if (!me.getSectors().length) {
                Ext.log.warn(Ext.String.format('Invalid config property "sectors" found in {0} component.', me.xtype));
                return;
            }
            for (i = me.getSectors().length, i > 0; i--;) {
                sector = sectors[i];
                if (percent <= sector.end) {
                    me.setUi(sector.ui);
                }
            }
        }
    },

    updateValue: function (value, oldValue) {
        this.callParent(arguments);
        this.applySector(Math.round(value * 100));
    }
});
