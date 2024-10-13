import Chart from "react-apexcharts";
export default function StockChart({stockData, symbol}) {
    console.log(`from StockChart ${JSON.stringify(stockData)} and the symbol is ${symbol}`);
    const options = {
        title:{
            text: `Stock Chart for ${symbol}`,
            align: "center",
            style:{
                fontSize: "10px"
            }
        },
        chart: {
            id: "stock data",
            animation:{
                speed: 1300
            }
        },
        xaxis:{
            categories: stockData.map((stock) =>{

                return new Date(stock.t).toLocaleDateString();
            })

        }
    }
    const data = stockData.map((stock) => stock.c);
    const series = [{
        name: symbol,
        data: data
    }];
    console.log(JSON.stringify(series));
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