import { useState } from 'react';
import './App.css';
import { Outlet } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <main className="container my-4" style={{ maxWidth: "1200px" }}>
                <Outlet
                    context={{
                        watchList,
                        addSymbolToWatchList,
                        removeSymbolFromWatchList
                    }}
                />
            </main>
            <Footer />
        </div>
    );
}

export default App;
