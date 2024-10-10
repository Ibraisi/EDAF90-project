import {useState, useEffect} from 'react';
import {useOutletContext} from 'react-router-dom';
import SymbolSearch from "../components/SymbolSearch.jsx";
import StockSelector from "../components/StockSelector.jsx";

export default function StockOverviewPage() {
    return (
        <div>
            <SymbolSearch/>
            <StockSelector/>
        </div>
    )
}