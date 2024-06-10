Ext.define('SenchaExample.view.grid.complex.ComplexGridRowModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.complexgridrowmodel',

    formulas: {
        ratingGroup: function (get) {
            const age = get('record.averageRating');

            if (age < 4) {
                return 0;
            }

            if (age < 5) {
                return 1;
            }

            if (age < 6) {
                return 2;
            }

            return 3;
        },
        changeSettings: function (get) {
            if (get('record').get('age') > 18) {
                return i18next.t('CHANGE_SETTINGS');
            } else {
                return i18next.t('CAN_NOT_CHANGE_SETTINGS') + ' ' + get('record').get('fullName')
            }
        }
    }
});