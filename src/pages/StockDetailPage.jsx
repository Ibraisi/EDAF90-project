import { useParams } from "react-router-dom";
import { useState } from "react";
import Polygon from "../api/Polygon";
import StockChart from "../components/StockChart.jsx";
import StockForm from "../components/StockForm.jsx";

export default function StockDetailPage() {
    const { symbol } = useParams();
    const [stockData, setStockData] = useState();
    const [strategyData, setStrategyData] = useState();

    const calculateSMA = (data, period) => {
        const sma = [];
        for (let i = period - 1; i < data.length; i++) {
            const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val.c, 0);
            sma.push({ x: data[i].t, y: sum / period });
        }
        return sma;
    };

    const calculateEMA = (data, period) => {
        const k = 2 / (period + 1);
        const ema = [{ x: data[0].t, y: data[0].c }];
        for (let i = 1; i < data.length; i++) {
            const newValue = data[i].c * k + ema[i - 1].y * (1 - k);
            ema.push({ x: data[i].t, y: newValue });
        }
        return ema;
    };

    const fetchStockData = async (data) => {
        const { multiplier, timespan, from, to, strategy, shortPeriod, longPeriod } = data;
        try {
            const response = await Polygon.get(`${symbol}/range/${multiplier}/${timespan}/${from}/${to}`, {});
            setStockData(response.data.results);

            if (strategy !== "none") {
                const shortTermData = strategy === "sma"
                    ? calculateSMA(response.data.results, shortPeriod)
                    : calculateEMA(response.data.results, shortPeriod);
                const longTermData = strategy === "sma"
                    ? calculateSMA(response.data.results, longPeriod)
                    : calculateEMA(response.data.results, longPeriod);
                setStrategyData({ shortTerm: shortTermData, longTerm: longTermData });
            } else {
                setStrategyData(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container">
            <h3 className="my-4">{`Stock Details for ${symbol}`}</h3>

            <div className="alert alert-info">
                <h4 className="alert-heading">Welcome to the Stock Detail Page!</h4>
                <p>This page allows you to view historical stock data for {symbol} and apply basic trading strategies.</p>
                <hr />
                <p className="mb-0">Use the form below to customize your view:</p>
                <ul>
                    <li>Set the date range and data aggregation level (daily, weekly, or monthly).</li>
                    <li>Choose a trading strategy (Simple Moving Average or Exponential Moving Average) to overlay on the chart.</li>
                    <li>Specify short-term and long-term periods for the selected strategy.</li>
                </ul>
                <p>After submitting the form, the chart will update to display the stock price and selected strategy indicators.</p>
            </div>

            <StockForm onSubmit={fetchStockData} />

            {stockData ? (
                <div className="my-4">
                    <StockChart stockData={stockData} strategyData={strategyData} symbol={symbol} width="100%" height="500px" />
                </div>
            ) : (
                <p className="alert alert-warning">No data available. Please submit the form to see the stock data.</p>
            )}
        </div>
    );
}
