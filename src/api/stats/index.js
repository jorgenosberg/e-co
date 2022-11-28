import axios from "axios";

export const fetchDayPrices = async (country) => {
    try {
        const date = new Date().toLocaleDateString("en-CA");
        console.log(country);
        console.log(date);
        const response = await axios.get(`https://api.iea.org/rte/price/hourly/${country}/timeseries?from=${date}&to=${date}&currency=local`);
        return { values: response.data.map(a => a.Value), labels: response.data.map((a, i) => `${i}:00`) }
    } catch (e) {
        console.error(e)
    }
}

export const fetchWeekPrices = async (country) => {
    const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-CA")
    const end = new Date().toLocaleDateString("en-CA");
    const response = await axios.get(`https://api.iea.org/rte/price/${country}/timeseries?from=${start}&to=${end}&currency=local&precision=day`);
    return { values: response.data.map(a => a.Value), labels: response.data.map(a => a.Date.slice(5, 10).replace('-', '/')) }
}

export const fetchMonthPrices = async (country) => {
    const start = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-CA")
    const end = new Date().toLocaleDateString("en-CA");
    const response = await axios.get(`https://api.iea.org/rte/price/${country}/timeseries?from=${start}&to=${end}&currency=local&precision=day`);
    const data = response.data.filter((a, i) => i % 2)
    return { values: data.map(a => a.Value), labels: data.map(a => a.Date.slice(5, 10).replace('-', '/')) }
}