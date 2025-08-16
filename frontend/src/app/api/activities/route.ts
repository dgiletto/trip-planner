import { NextRequest, NextResponse } from 'next/server';
import { getSuggestedActivities } from '@/lib/aiPlanner';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { destination, start, end, budget, tripStyle } = body;

        if (!destination || !start || !end || !budget || !tripStyle) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const activities = await getSuggestedActivities(
            destination,
            start,
            end,
            budget,
            tripStyle
        );

        return NextResponse.json(activities);
    } catch (err) {
        console.error('Activities API error:', err);
        return NextResponse.json(
            { error: 'Failed to generate activities' },
            { status: 500 }
        );
    }
}