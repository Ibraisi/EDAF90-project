import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import finnHub from "../api/FinnHub.js";

export default function StockDetailPage() {
    const {symbol} = useParams();

    return (
        <div>
            <h3>{`Stock detail page for the symbol ${symbol}`}</h3>
        </div>
    )
}