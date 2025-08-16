import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
});

export async function getSuggestedActivities(
    destination: string,
    start: string,
    end: string,
    budget: string,
    tripStyle: string
) {
    const prompt = `
    Plan a detailed trip to ${destination} from ${start} to ${end} with a ${budget} budget.
    Trip style: ${tripStyle}.

    Return JSON in the following format:
    {
        "suggestedActivities": [
            {
                "name": "Activity Name",
                "category": "Food | Sightseeing | Outdoor | Nightlife",
                "description": "...",
                "bestTime": "Morning | Afternoon | Evening",
                "location": "City the Activity is in"
            }
        ]
    }
    Ensure the activities are realistic for ${destination} and the time of year.
    `;
    const response = await openai.chat.completions.create({
        model: "openai/gpt-oss-20b:free",
        messages: [{ role: "user", content: prompt}],
        temperature: 0.7
    });

    return JSON.parse(response.choices[0].message.content || '{}');
}