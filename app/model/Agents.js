Ext.define('SenchaExample.model.Agents', {
    extend: 'SenchaExample.model.Base',

    requires: [
        'Ext.data.summary.Average'
    ],

    idField: 'agentId',

    fields: [
        { name: 'agentId', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'region', type: 'string' },
        { name: 'bookings', type: 'integer', summary: 'sum' },
        { name: 'revenue', type: 'number', summary: 'sum' },
        { name: 'rating', type: 'integer', summary: 'average' },
        { name: 'joinDate', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'active', type: 'boolean' },
        { name: 'company', type: 'string' },
        {
            name: 'fullName',
            calculate: function (data) {
                return data.name || '';
            }
        }
    ]
});