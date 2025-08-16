import axios from "axios";

const SERPAPI_BASE = "https://serpapi.com/search";

export async function getFlightsApi({
    origin,          // e.g. "JFK"
    destination,     // e.g. "LAX" or city name
    departDate,      // "YYYY-MM-DD"
    returnDate,      // "YYYY-MM-DD" or undefined for one-way
    adults = 1,
    cabin = "economy", // optional
    currency = "USD",
    maxResults = 10
}: {
    origin: string;
    destination: string;
    departDate: string;
    returnDate: string;
    adults?: number;
    cabin?: string;
    currency?: string;
    maxResults?: number;
}) {
    const params: Record<string, string> = {
        engine: "google flights",
        departure_id: origin,
        arrival_id: destination,
        outbound_date: departDate,
        return_date: returnDate,
        currency: currency,
        passengers: String(adults),
        hl: "en",
        api_key: process.env.SERPAPI_API_KEY!
    };
    if (cabin) params["cabin"] = cabin;
    params["num_results"] = String(maxResults);

    const { data } = await axios.get(SERPAPI_BASE, { params });
    return {
        raw: data,
        best_flights: data?.best_flights ?? [],
        other_flights: data?.other_flights ?? []
    };
}