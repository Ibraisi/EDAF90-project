import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Polygon from "../api/Polygon";
import StockChart from "../components/StockChart.jsx";
import StockForm from "../components/StockForm.jsx";

export default function StockDetailPage() {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stockData, setStockData] = useState(null);
  const [strategyData, setStrategyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateSMA = (data, period) => {
    if (period <= 0 || data.length < period) return [];
    return data.slice(period - 1).map((_, index) => {
      const slice = data.slice(index, index + period);
      const sum = slice.reduce((acc, val) => acc + val.c, 0);
      return { x: new Date(data[index + period - 1].t), y: sum / period };
    });
  };

  const calculateEMA = (data, period) => {
    if (period <= 0 || data.length < period) return [];
    const k = 2 / (period + 1);
    const initialSMA = data.slice(0, period).reduce((acc, val) => acc + val.c, 0) / period;
    return data.slice(period - 1).reduce((ema, value, i) => {
      const newValue = i === 0 ? initialSMA : value.c * k + ema[i - 1].y * (1 - k);
      ema.push({ x: new Date(value.t), y: newValue });
      return ema;
    }, []);
  };

  const fetchStockData = async (formData) => {
    const { multiplier, timespan, from, to, strategy, shortPeriod, longPeriod } = formData;
    setError(null);
    setLoading(true);

    try {
      const response = await Polygon.get(`/${symbol}/range/${multiplier}/${timespan}/${from}/${to}`);
      const results = response.data.results;

      if (!results || results.length === 0) {
        throw new Error("No data available for the selected date range.");
      }

      const formattedResults = results.map(item => ({
        ...item,
        t: new Date(item.t).toISOString(),
      }));

      setStockData(formattedResults);

      if (strategy === "sma" || strategy === "ema") {
        const calculationFunction = strategy === "sma" ? calculateSMA : calculateEMA;
        const shortTermData = calculationFunction(formattedResults, parseInt(shortPeriod));
        const longTermData = calculationFunction(formattedResults, parseInt(longPeriod));
        setStrategyData({ shortTerm: shortTermData, longTerm: longTermData });
      } else {
        setStrategyData(null);
      }
    } catch (e) {
      console.error("Error fetching stock data:", e);
      setError(e.message || "An error occurred while fetching stock data.");
      setStockData(null);
      setStrategyData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockData({
      multiplier: 1,
      timespan: "day",
      from: "2023-01-01",
      to: "2023-12-31",
      strategy: "none",
      shortPeriod: 10,
      longPeriod: 20
    });
  }, [symbol]);

  return (
    <div className="container mt-5">
      <h3 className="my-4">{`Stock Details for ${symbol}`}</h3>
      <button onClick={() => navigate('/')} className="btn btn-secondary mb-3">Back to Home</button>

      <StockForm onSubmit={fetchStockData} />

      {loading && <div className="alert alert-info">Loading data...</div>}

      {error && (
        <div className="alert alert-danger my-4">
          {error}
        </div>
      )}

      {stockData && (
        <div className="my-4">
          <StockChart
            stockData={stockData}
            strategyData={strategyData}
            symbol={symbol}
          />
        </div>
      )}
    </div>
  );
}
