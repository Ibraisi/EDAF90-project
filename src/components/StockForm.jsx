import { useForm } from "react-hook-form";

export default function StockForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            multiplier: 1,
            timespan: "day",
            from: "2024-09-30",
            to: "2024-10-06",
            strategy: "none",
            shortPeriod: 10,
            longPeriod: 20
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="mb-3">
                <label htmlFor="multiplier" className="form-label">Multiplier</label>
                <input
                    type="number"
                    id="multiplier"
                    className={`form-control ${errors.multiplier ? 'is-invalid' : ''}`}
                    {...register("multiplier", { required: "Multiplier is required" })}
                />
                {errors.multiplier && <div className="invalid-feedback">{errors.multiplier.message}</div>}
                <div className="form-text">Multiplier represents the aggregation level of stock data (e.g., 1 for daily data, 7 for weekly data).</div>
            </div>

            <div className="mb-3">
                <label htmlFor="timespan" className="form-label">Timespan</label>
                <select
                    id="timespan"
                    className={`form-select ${errors.timespan ? 'is-invalid' : ''}`}
                    {...register("timespan", { required: "Timespan is required" })}
                >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                </select>
                {errors.timespan && <div className="invalid-feedback">{errors.timespan.message}</div>}
                <div className="form-text">Select the timespan for the stock data aggregation.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="from" className="form-label">From Date</label>
                <input
                    type="date"
                    id="from"
                    className={`form-control ${errors.from ? 'is-invalid' : ''}`}
                    {...register("from", { required: "From date is required" })}
                />
                {errors.from && <div className="invalid-feedback">{errors.from.message}</div>}
                <div className="form-text">Start date for the stock data range.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="to" className="form-label">To Date</label>
                <input
                    type="date"
                    id="to"
                    className={`form-control ${errors.to ? 'is-invalid' : ''}`}
                    {...register("to", { required: "To date is required" })}
                />
                {errors.to && <div className="invalid-feedback">{errors.to.message}</div>}
                <div className="form-text">End date for the stock data range.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="strategy" className="form-label">Trading Strategy</label>
                <select
                    id="strategy"
                    className={`form-select ${errors.strategy ? 'is-invalid' : ''}`}
                    {...register("strategy")}
                >
                    <option value="none">None</option>
                    <option value="sma">Simple Moving Average (SMA)</option>
                    <option value="ema">Exponential Moving Average (EMA)</option>
                </select>
                {errors.strategy && <div className="invalid-feedback">{errors.strategy.message}</div>}
                <div className="form-text">Select a trading strategy to display on the chart.</div>
            </div>

            <div className="mb-3">
                <label htmlFor="shortPeriod" className="form-label">Short Period</label>
                <input
                    type="number"
                    id="shortPeriod"
                    className={`form-control ${errors.shortPeriod ? 'is-invalid' : ''}`}
                    {...register("shortPeriod", { required: "Short period is required", min: 1 })}
                />
                {errors.shortPeriod && <div className="invalid-feedback">{errors.shortPeriod.message}</div>}
                <div className="form-text">Number of periods for the short-term moving average (e.g., 10).</div>
            </div>

            <div className="mb-3">
                <label htmlFor="longPeriod" className="form-label">Long Period</label>
                <input
                    type="number"
                    id="longPeriod"
                    className={`form-control ${errors.longPeriod ? 'is-invalid' : ''}`}
                    {...register("longPeriod", { required: "Long period is required", min: 1 })}
                />
                {errors.longPeriod && <div className="invalid-feedback">{errors.longPeriod.message}</div>}
                <div className="form-text">Number of periods for the long-term moving average (e.g., 20).</div>
            </div>

            <button type="submit" className="btn btn-primary">Fetch Data</button>
        </form>
    );
}
