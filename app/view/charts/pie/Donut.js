Ext.define('SenchaExample.view.chars.pie.Donut', {
    extend: 'Ext.chart.PolarChart',
    alias: 'widget.donutpiechartexample',
    requires: [
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.interactions.ItemHighlight'
    ],
    shadow: 'true',
    legend: {
        type: 'sprite',
        docked: 'right',
        marker: {
            size: 16
        }
    },
    insetPadding: 50,
    interactions: ['rotate', 'itemhighlight'],
    series: [{
        type: 'pie',
        donut: 50,
        animation: {
            easing: 'easeOut',
            duration: 500
        },
        angleField: 'salary',  // bind pie slice angular span to market share
        highlight: {
            margin: 20
        },
        label: {
            field: 'fullName',      // bind label text to name
            display: 'outside',
            fontSize: 14
        },
        style: {
            strokeStyle: 'white',
            lineWidth: 1
        },
        tooltip: {
            trackMouse: true,
            renderer: function (tooltip, record, item) {
                tooltip.setHtml(record.get('fullName') + ': ' + record.get('salary'));
            }
        }
    }]
});