import { useForm } from "react-hook-form";

export default function StockForm({ onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            multiplier: 1,
            timespan: "day",
            from: "2024-09-30",
            to: "2024-10-06"
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
                <div className="form-text">Multiplier represents the aggregation level of stock data (e.g., 1 for daily data).</div>
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
            </div>

            <button type="submit" className="btn btn-primary">Fetch Data</button>
        </form>
    );
}
