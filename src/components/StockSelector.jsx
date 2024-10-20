import { useOutletContext, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FinnHub from "../api/FinnHub.js";
import { BsCaretUpFill, BsCaretDown } from "react-icons/bs";

const changeColor = (value) => {
    if (value > 0) {
        return "text-success"
    } else if (value < 0) {
        return "text-danger"
    } else {
        return "text-dark"
    }
}

const addIcon = (value) => {
    if (value > 0) {
        return <BsCaretUpFill />
    } else if (value < 0) {
        return <BsCaretDown />
    } else {
        return ""
    }
}

export default function StockSelector() {
    const { watchList, removeSymbolFromWatchList } = useOutletContext();
    const [stockData, setStockData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    watchList.map((symbol) => {
                        return FinnHub.get("/quote", {
                            params: {
                                symbol: symbol
                            }
                        });
                    })
                );
                const re = responses.map(res => {
                    return {
                        data: res.data,
                        symbol: res.config.params.symbol
                    }
                });
                setStockData(re);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, [watchList]);

    const handleStockClick = (symbol) => {
        navigate(`/detail/${symbol}`);
    }

    return (
        <div>
            <table className="table hover mt-5">
                <thead>
                    <tr>
                        <th scope="col">Symbol</th>
                        <th scope="col">Current Price</th>
                        <th scope="col">Price change</th>
                        <th scope="col">Percent change</th>
                        <th scope="col">High price of the day</th>
                        <th scope="col">Low price of the day</th>
                        <th scope="col">Open price of the day</th>
                        <th scope="col">Previous close price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockData.map((stock) => {
                        return (
                            <tr key={stock.symbol}>
                                <th scope="row">{stock.symbol}</th>
                                <td>{stock.data.c}</td>
                                <td className={changeColor(stock.data.d)}>{stock.data.d} {addIcon(stock.data.d)}</td>
                                <td className={changeColor(stock.data.dp)}>{stock.data.dp} {addIcon(stock.data.dp)}</td>
                                <td>{stock.data.h}</td>
                                <td>{stock.data.l}</td>
                                <td>{stock.data.o}</td>
                                <td>{stock.data.pc}</td>
                                <td>
                                    <div className="d-flex align-items-stretch">
                                        <button
                                            className="btn btn-primary btn-sm m-1"
                                            onClick={() => handleStockClick(stock.symbol)}
                                        >
                                            View Details
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm m-1"
                                            onClick={() => removeSymbolFromWatchList(stock.symbol)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
