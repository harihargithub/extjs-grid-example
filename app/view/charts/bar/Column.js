Ext.define('SenchaExample.view.chars.bar.Column', {
    extend: 'Ext.chart.CartesianChart',
    alias: 'widget.columnchartexample',
    requires: [
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric'
    ],
    shadow: 'true',
    insetPadding: '20 10',
    axes: [{
        type: 'numeric',
        position: 'left',
        fields: 'salary',
        grid: true,
        renderer: function (axis, label) {
            return Ext.util.Format.currency(label);
        },
    }, {
        type: 'category',
        position: 'bottom',
        fields: 'fullName',
        grid: true,
        label: {
            rotate: {
                degrees: -90
            }
        }
    }],
    series: [{
        type: 'bar',
        xField: 'fullName',
        yField: 'salary'
    }]
});