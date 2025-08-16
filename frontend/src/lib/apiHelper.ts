export const fetchFlights = async (params: {
    origin: string,
    destination: string,
    departDate: string,
    returnDate: string,
    adults: number
}) => {
    const response = await fetch('/api/flights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error('Failed to fetch flights');
    }

    return response.json();
};

export const fetchHotels = async (params: {
    query: string,
    checkIn?: string,
    checkOut?: string,
    adults: number
}) => {
    const response = await fetch('/api/hotels', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error('Failed to fetch hotels');
    }

    return response.json();
}

export const fetchActivities = async (params: {
    destination: string,
    start: string,
    end: string,
    budget: string,
    tripStyle: string
}) => {
    const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    });

    if (!response.ok) {
        throw new Error('Failed to fetch activities');
    }

    return response.json();
};