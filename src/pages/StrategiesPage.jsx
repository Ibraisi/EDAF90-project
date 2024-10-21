import React from 'react';
import { Link } from 'react-router-dom';

export default function StrategiesPage() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1 className="display-4 text-center mb-5">Trading Strategies</h1>
                    <div className="card mb-5 shadow">
                        <div className="card-body">
                            <p className="lead">
                                This page provides an overview of the trading strategies available in our stock analysis tool.
                                Understanding these strategies can help you make more informed decisions when analyzing stock data.
                            </p>
                        </div>
                    </div>

                    <div className="card mb-5 shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="h4 mb-0">Simple Moving Average (SMA)</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                The Simple Moving Average (SMA) is a widely used technical indicator that smooths out price data
                                by calculating the average price over a specified period.
                            </p>
                            <h3 className="h5 mt-4">Key Points:</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Calculated by adding up the closing prices for a specific number of periods and dividing by that number.</li>
                                <li className="list-group-item">Helps identify trends by smoothing out short-term price fluctuations.</li>
                                <li className="list-group-item">Typically used with two periods: a short-term (e.g., 10 days) and a long-term (e.g., 50 days).</li>
                                <li className="list-group-item">A crossover of the short-term SMA above the long-term SMA might signal a bullish trend, while the opposite might signal a bearish trend.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card mb-5 shadow">
                        <div className="card-header bg-success text-white">
                            <h2 className="h4 mb-0">Exponential Moving Average (EMA)</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                The Exponential Moving Average (EMA) is similar to the SMA but gives more weight to recent data points,
                                making it more responsive to new information.
                            </p>
                            <h3 className="h5 mt-4">Key Points:</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Calculated using a formula that applies more weight to recent prices.</li>
                                <li className="list-group-item">Reacts more quickly to recent price changes compared to SMA.</li>
                                <li className="list-group-item">Often used in conjunction with other indicators to confirm trends and generate trading signals.</li>
                                <li className="list-group-item">Like SMA, typically used with short-term and long-term periods for crossover analysis.</li>
                            </ul>
                        </div>
                    </div>

                    <div className="card mb-5 shadow">
                        <div className="card-header bg-info text-white">
                            <h2 className="h4 mb-0">Using Strategies in Our Tool</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                When using our stock analysis tool, you can apply these strategies by selecting either SMA or EMA
                                in the strategy dropdown. You'll then be able to specify the short and long periods for the chosen strategy.
                            </p>
                            <p>
                                The tool will calculate and display the selected moving averages on the stock chart, allowing you
                                to visually analyze potential trends and crossovers.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-5">
                        <Link to="/" className="btn btn-primary btn-lg">Back to Stock Analysis</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
