import axios from 'axios';

const TOKEN = "5S0QrI2lO8VbY3mtYdaYdTpfkG8LqUJ1";

export default axios.create({
    baseURL: "https://api.polygon.io/v2/aggs/ticker/",
    params: {
        apiKey: TOKEN,
        adjusted: true,
        sort: "asc",
    }
})
