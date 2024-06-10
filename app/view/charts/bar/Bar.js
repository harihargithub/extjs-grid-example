Ext.define('SenchaExample.view.chars.bar.Bar', {
    extend: 'Ext.chart.CartesianChart',
    alias: 'widget.barchartexample',
    requires: [
        'Ext.chart.series.Bar',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric'
    ],
    shadow: 'true',
    flipXY: true,
    insetPadding: '20 10',
    axes: [{
        type: 'numeric',
        position: 'bottom',
        fields: 'salary',
        grid: {
            even: {
                lineWidth: 1
            },
            odd: {
                stroke: '#fff'
            }
        },
        grid: true,
        renderer: function (axis, label) {
            return Ext.util.Format.currency(label);
        }
    }, {
        type: 'category',
        position: 'left',
        fields: 'fullName',        
        grid: true
    }],
    series: [{
        type: 'bar',
        xField: 'fullName',
        yField: 'salary'
    }]
});