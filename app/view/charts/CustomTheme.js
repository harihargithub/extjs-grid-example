Ext.define('SenchaExample.view.charts.CustomTheme', {
    extend: 'Ext.chart.theme.Base',
    singleton: true,
    alias: ['chart.theme.custom-theme'],
    config: {
        chart: {
            defaults: {
                captions: {
                    title: {
                        docked: 'top',
                        padding: 5,
                        style: {
                            textAlign: 'center',
                            fontFamily: 'default',
                            fontWeight: '500',
                            fillStyle: 'black',
                            fontSize: 'default*1.2'
                        }
                    },
                    subtitle: {
                        docked: 'top',
                        style: {
                            textAlign: 'center',
                            fontFamily: 'default',
                            fontWeight: 'normal',
                            fillStyle: 'black',
                            fontSize: 'default*1.2'
                        }
                    },
                    credits: {
                        docked: 'bottom',
                        padding: 5,
                        style: {
                            textAlign: 'left',
                            fontFamily: 'default',
                            fontWeight: 'lighter',
                            fillStyle: 'black',
                            fontSize: 'default'
                        }
                    }
                },
                background: 'white'
            }
        },
        legend: {
            label: {
                fontSize: 12,
                fontWeight: 'default',
                fontFamily: 'default',
                fillStyle: 'black'
            },
            border: {
                lineWidth: 1,
                radius: 4,
                fillStyle: 'none',
                strokeStyle: 'gray'
            },
            background: 'white'
        },
        axis: {
            defaults: {
                style: {
                    strokeStyle: '#898989'
                },
                label: {
                    fillStyle: '#898989',
                    fontSize: 11
                },
                title: {
                    fillStyle: '#898989',
                    fontSize: 12
                }
            }
        },
        series: {
            defaults: {
                label: {
                    font: '11px Open Sans'
                }
            }
        },
        colors: [
            '#1BB394',
            '#3498DB',
            '#C0392B',
            '#BABABA',
            '#F1C40F',
            '#9399C8',
            '#9B59B6',
            '#4ac0f2',
            '#ff8809',
            '#6FECD1',
        ]
    }
});