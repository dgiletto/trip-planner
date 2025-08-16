import { NextRequest, NextResponse } from "next/server";
import { getFlightsApi } from "@/lib/serpapiFlights";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { origin, destination, departDate, returnDate, adults } = body;

        if (!origin || !destination || !departDate || !returnDate) {
            return NextResponse.json(
                { error: 'Missing required parameters'},
                { status: 400 }
            );
        }

        const flightResults = await getFlightsApi({
            origin,
            destination,
            departDate,
            returnDate,
            adults: parseInt(adults) || 1,
            maxResults: 10
        });

        return NextResponse.json(flightResults);
    } catch (err) {
        console.error('Flight API error:', err);
        return NextResponse.json(
            { error: 'Failed to fetch flights' },
            { status: 500 }
        );
    }
}