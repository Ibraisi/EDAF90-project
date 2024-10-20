import React from 'react';
import Chart from "react-apexcharts";

export default function StockChart({stockData, strategyData, symbol}) {
    const options = {
        title: {
            text: `Stock Chart for ${symbol}`,
            align: "center",
            style: {
                fontSize: "20px",
                fontWeight: "bold"
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            },
            toolbar: {
                show: true,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                }
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false,
                style: {
                    fontSize: '12px'
                }
            },
            tickAmount: 6
        },
        yaxis: {
            tooltip: {
                enabled: true
            },
            labels: {
                formatter: function (value) {
                    return value.toFixed(2);
                },
                style: {
                    fontSize: '12px'
                }
            },
            tickAmount: 6
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy"
            },
            y: {
                formatter: function(value) {
                    return `$${value.toFixed(2)}`;
                }
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            fontSize: '14px'
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        colors: ['#008FFB', '#00E396', '#FEB019'],
        grid: {
            borderColor: "#f1f1f1",
            row: {
                colors: ['transparent', 'transparent'],
                opacity: 0.5
            }
        },
        theme: {
            mode: 'light'
        }
    };

    const series = [
        {
            name: symbol,
            data: stockData.map((stock) => ({ x: new Date(stock.t).getTime(), y: parseFloat(stock.c.toFixed(2)) }))
        }
    ];

    if (strategyData) {
        series.push(
            {
                name: "Short-term",
                data: strategyData.shortTerm.map(data => ({ x: data.x.getTime(), y: parseFloat(data.y.toFixed(2)) }))
            },
            {
                name: "Long-term",
                data: strategyData.longTerm.map(data => ({ x: data.x.getTime(), y: parseFloat(data.y.toFixed(2)) }))
            }
        );
    }

    return (
        <div className='mt-5 p-4 bg-white shadow-sm rounded'>
            <Chart
                options={options}
                series={series}
                type="line"
                width="100%"
                height="500px"
            />
        </div>
    );
}
