import {createBrowserRouter} from "react-router-dom";
import App from "./App.jsx";
import StockOverviewPage from "./pages/StockOverviewPage.jsx";
import StockDetailPage from "./pages/StockDetailPage.jsx";
import StrategiesPage from "./pages/StrategiesPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <StockOverviewPage/>
            },
            {
                path: "detail/:symbol",
                element: <StockDetailPage/>
            },
            {
                path: "/strategies",
                element: <StrategiesPage/>
            }

        ]
    }
]);
export default router;
