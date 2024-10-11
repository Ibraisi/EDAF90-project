import {useState} from 'react'

import './App.css'
import {Outlet} from "react-router-dom";

function App() {
    const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

    // Function to add a symbol to the watchlist
    const addSymbolToWatchList = (symbol) => {
        if (watchList.includes(symbol)) {
            return;
        }
        setWatchList([...watchList, symbol]);
    };

    // Function to remove a symbol from the watchlist
    const removeSymbolFromWatchList = (symbol) => {
        setWatchList(watchList.filter((item) => item !== symbol));
    };
    return (
        <main className="container">
            <h1>StrategiTestaren</h1>
            <Outlet
                context={
                    {
                        watchList,
                        addSymbolToWatchList,
                        removeSymbolFromWatchList
                    }
                }
            />
        </main>
    )
}

export default App
