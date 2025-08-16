import axios from "axios"

const SERPAPI_BASE = "https://serpapi.com/search"

export async function searchHotelsSerpApi({
    query,          // location string e.g. "New York, NY" or "Bali resorts"
    checkIn,        // "YYYY-MM-DD"
    checkOut,       // "YYYY-MM-DD"
    adults = 1,
    currency = "USD",
    maxResults = 10
} : {
    query: string;
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    currency?: string;
    maxResults?: number;
}) {
    const params: Record<string, string> = {
        engine: "google_hotels",
        q: query,
        api_key: process.env.SERPAPI_API_KEY!,
        currency
    };

    if (checkIn) params["check_in"] = checkIn;
    if (checkOut) params["check_out"] = checkOut;
    params["adults"] = String(adults);
    params["max_results"] = String(maxResults);

    const { data } = await axios.get(SERPAPI_BASE, { params });
    return {
        raw: data,
        properties: data?.properties ?? []
    };
}

export async function getHotelDetails(property_token: string) {
    const params = {
        engine: "google_hotel_property",
        property_token,
        api_key: process.env.SERPAPI_API_KEY!
    };

    const { data } = await axios.get(SERPAPI_BASE, { params });
    return data;
}