import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Polygon from "../api/Polygon";
import StockChart from "../components/StockChart.jsx";
import StockForm from "../components/StockForm.jsx";

export default function StockDetailPage() {
    const { symbol } = useParams();
    const [stockData, setStockData] = useState();

    const fetchStockData = async (data) => {
        const { multiplier, timespan, from, to } = data;
        try {
            const response = await Polygon.get(`${symbol}/range/${multiplier}/${timespan}/${from}/${to}`, {});
            console.log(response.data.results);
            setStockData(response.data.results);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container">
            <h3 className="my-4">{`Stock detail page for the stock ${symbol}`}</h3>

            <p className="alert alert-info">Please use the form below to fetch stock data based on your preferred time range.</p>

            <StockForm onSubmit={fetchStockData} />

            {stockData ? (
                <div className="my-4">
                    <StockChart stockData={stockData} symbol={symbol} width="100%" height="500px" />
                </div>
            ) : (
                <p className="alert alert-warning">No data available. Please submit the form to see the stock data.</p>
            )}
        </div>
    );
}
