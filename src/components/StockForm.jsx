import { useForm } from "react-hook-form";

export default function StockForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            multiplier: 1,
            timespan: "day",
            from: "2024-01-01",
            to: "2024-12-31",
            strategy: "none",
            shortPeriod: 10,
            longPeriod: 20
        }
    });

    const strategy = watch("strategy");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label htmlFor="multiplier" className="form-label">Multiplier</label>
                    <input
                        type="number"
                        id="multiplier"
                        className={`form-control ${errors.multiplier ? 'is-invalid' : ''}`}
                        {...register("multiplier", { required: "Multiplier is required", min: 1 })}
                    />
                    {errors.multiplier && <div className="invalid-feedback">{errors.multiplier.message}</div>}
                </div>

                <div className="col-md-4 mb-3">
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
                </div>

                <div className="col-md-4 mb-3">
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
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="from" className="form-label">From Date</label>
                    <input
                        type="date"
                        id="from"
                        className={`form-control ${errors.from ? 'is-invalid' : ''}`}
                        {...register("from", { required: "From date is required" })}
                    />
                    {errors.from && <div className="invalid-feedback">{errors.from.message}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="to" className="form-label">To Date</label>
                    <input
                        type="date"
                        id="to"
                        className={`form-control ${errors.to ? 'is-invalid' : ''}`}
                        {...register("to", { required: "To date is required" })}
                    />
                    {errors.to && <div className="invalid-feedback">{errors.to.message}</div>}
                </div>
            </div>

            {strategy !== "none" && (
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="shortPeriod" className="form-label">Short Period</label>
                        <input
                            type="number"
                            id="shortPeriod"
                            className={`form-control ${errors.shortPeriod ? 'is-invalid' : ''}`}
                            {...register("shortPeriod", { required: "Short period is required", min: 1 })}
                        />
                        {errors.shortPeriod && <div className="invalid-feedback">{errors.shortPeriod.message}</div>}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="longPeriod" className="form-label">Long Period</label>
                        <input
                            type="number"
                            id="longPeriod"
                            className={`form-control ${errors.longPeriod ? 'is-invalid' : ''}`}
                            {...register("longPeriod", { required: "Long period is required", min: 1 })}
                        />
                        {errors.longPeriod && <div className="invalid-feedback">{errors.longPeriod.message}</div>}
                    </div>
                </div>
            )}

            <button type="submit" className="btn btn-primary">Fetch Data</button>
        </form>
    );
}
