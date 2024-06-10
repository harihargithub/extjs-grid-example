Ext.define('SenchaExample.view.chars.line.Line', {
    extend: 'Ext.chart.CartesianChart',
    alias: 'widget.linechartexample',
    requires: [
        'Ext.chart.series.Line',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.Crosshair',
    ],
    shadow: 'true',
    insetPadding: '20 20 10 10',
    interations: [{
        type: 'crosshair',
        axes: {
            label: {
                fillStyle: 'white'
            },
            rect: {
                fillStyle: '#344459',
                opacity: 0.7,
                radius: 5
            }
        }
    }],
    axes: [{
        type: 'numeric',
        position: 'left',
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
        position: 'bottom',
        fields: 'fullName',
        grid: true,

    }],
    series: [{
        type: 'line',
        xField: 'fullName',
        yField: 'salary',
        smooth: true,
        style: {
            lineWidth: 2
        },
        marker: {
            radius: 4
        },
        highlight: {
            fillStyle: '#000',
            radius: 5,
            lineWidth: 2,
            strokeStyle: '#fff'
        }
    }]
});