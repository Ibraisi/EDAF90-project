import {useState,useEffect} from 'react';
import { useOutletContext } from 'react-router-dom';
import SymbolSearch from "../components/SymbolSearch.jsx";
import StockSelector from "../components/StockSelector.jsx";
export default function StockOverviewPage() {
    const [stockData, setStockData] = useState([]);
    //const { watchList } = useOutletContext();


    return (
    <div>
      <h2>Stock Overview Page contains:</h2>
        <SymbolSearch/>
        <StockSelector/>
    </div>
  )
}