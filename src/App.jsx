import { useState } from 'react'

import './App.css'
import {Outlet} from "react-router-dom";

function App() {
  const[watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);


  return (
        <main className="container">
            <h1>StrategiTestaren</h1>
            <Outlet context={{watchList, setWatchList}}/>
        </main>
  )
}

export default App
