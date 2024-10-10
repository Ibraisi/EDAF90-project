import {useOutletContext} from "react-router-dom";
import {useState, useEffect} from "react";
import finnHub from "../api/FinnHub.js";


export default function SymbolSearch() {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const {addSymbolToWatchList, removeSymbolFromWatchList} = useOutletContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await finnHub.get("/search", {
                    params: {
                        q: search,
                        exchange: "US"
                    }
                });
                console.log(response);
                setSearchResults(response.data.result);
            } catch (e) {
                console.log(e);
            }
        }
        search.length > 1 ? fetchData() : setSearchResults([]);
    }, [search]);

    const renderingDropdown = () => {
        const toShow = searchResults.length > 0 ? "show" : "";
        return (
            <ul
                style={{
                    height: "500px",
                    overflowY: "scroll",
                    overFlowX: "hidden",
                    cursor: "pointer"
                }}
                className={`dropdown-menu ${toShow}`}
            >
                {searchResults.map((result) => {
                    return (
                        <li
                            className="dropdown-item"
                            key={result.symbol}
                            value={result.symbol}
                            onClick={() => {
                                addSymbolToWatchList(result.symbol);
                                setSearch("");
                            }}
                        >
                            {result.description} ({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    }
    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input
                    id="search"
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                >
                </input>
                <label htmlFor="search">Search</label>
                {renderingDropdown()}
            </div>
        </div>
    )
}