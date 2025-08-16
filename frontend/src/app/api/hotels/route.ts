import { NextRequest, NextResponse } from "next/server";
import { searchHotelsSerpApi } from "@/lib/serpapiHotels";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { query, checkIn, checkOut, adults } = body;

        if (!query) {
            return NextResponse.json(
                { error: 'Missing destination query' },
                { status: 400 }
            );
        }

        const hotelResults = await searchHotelsSerpApi({
            query,
            checkIn,
            checkOut,
            adults: parseInt(adults) || 1,
            maxResults: 10
        });

        return NextResponse.json(hotelResults);
    } catch (err) {
        console.error('Hotel API error:', err);
        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: 500 }
        );
    }
}