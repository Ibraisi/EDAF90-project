import Chart from "react-apexcharts";

export default function StockChart({stockData, symbol}) {

    const options = {
        title: {
            text: `Stock Chart for ${symbol}`,
            align: "center",
            style: {
                fontSize: "10px"
            }
        },
        chart: {
            id: "stock data",
            animation: {
                speed: 1300
            }
        },
        xaxis: {
            categories: stockData.map((stock) => {

                return new Date(stock.t).toLocaleDateString();
            })

        }
    }

    const series = [{
        name: symbol,
        data: stockData.map((stock) => stock.c)
    }];

    return (
        <div className='mt-5 p-4 bg-white'>
            <Chart
                options={options}
                series={series}
                type="area"
                width="100%"
            />
        </div>
    )
}