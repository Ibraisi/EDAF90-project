import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Polygon from "../api/Polygon";
import StockChart from "../components/StockChart.jsx";

export default function StockDetailPage() {
    const {symbol} = useParams();
    const [stockData, setStockData] = useState();

    const multiplier = 1;
    const timespan = "day";
    const from ="2024-09-30";
    const to = "2024-10-06";
    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const response = await Polygon.get(`${symbol}/range/${multiplier}/${timespan}/${from}/${to}`,{

                });
                console.log(response.data.results);
                setStockData(response.data.results);
            }catch (e){
                console.log(e);
            }
        }
        fetchData();

    },[symbol]);
    return (
        <div>
            <h3>{`Stock detail page for the symbol ${symbol}`}</h3>
            {stockData &&<StockChart
                stockData ={stockData}
                symbol = {symbol}
            />
            }
        </div>
    )
}