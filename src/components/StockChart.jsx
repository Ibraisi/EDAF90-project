import Chart from "react-apexcharts";

export default function StockChart({stockData, strategyData, symbol}) {
    const options = {
        title: {
            text: `Stock Chart for ${symbol}`,
            align: "center",
            style: {
                fontSize: "16px"
            }
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                datetimeUTC: false
            }
        },
        yaxis: {
            tooltip: {
                enabled: true
            }
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy"
            }
        },
        legend: {
            show: true
        }
    };

    const series = [
        {
            name: symbol,
            data: stockData.map((stock) => ({ x: stock.t, y: stock.c }))
        }
    ];

    if (strategyData) {
        series.push(
            {
                name: "Short-term",
                data: strategyData.shortTerm
            },
            {
                name: "Long-term",
                data: strategyData.longTerm
            }
        );
    }

    return (
        <div className='mt-5 p-4 bg-white'>
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
