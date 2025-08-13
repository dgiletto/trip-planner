import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, Wifi, Zap, Monitor, Leaf } from 'lucide-react';

// Type definitions
interface Airport {
  name: string;
  id: string;
  time: string;
}

interface Flight {
  departure_airport: Airport;
  arrival_airport: Airport;
  duration: number;
  airplane: string;
  airline: string;
  airline_logo: string;
  travel_class: string;
  flight_number: string;
  ticket_also_sold_by?: string[];
  legroom: string;
  extensions: string[];
  overnight?: boolean;
  often_delayed_by_over_30_min?: boolean;
}

interface Layover {
  duration: number;
  name: string;
  id: string;
  overnight?: boolean;
}

interface CarbonEmissions {
  this_flight: number;
  typical_for_this_route: number;
  difference_percent: number;
}

interface FlightData {
  flights: Flight[];
  layovers?: Layover[];
  total_duration: number;
  carbon_emissions: CarbonEmissions;
  price: number;
  type: string;
  airline_logo?: string;
  departure_token?: string;
}

interface FlightCardProps {
  flightData: FlightData;
}

const FlightCard: React.FC<FlightCardProps> = ({ flightData }) => {
  const formatTime = (timeStr: string): string => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatLayoverDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getEmissionsBadgeColor = (differencePercent: number): string => {
    if (differencePercent <= -10) return "bg-green-100 text-green-800";
    if (differencePercent <= 10) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getAmenityIcon = (extension: string): React.ReactNode => {
    if (extension.includes('Wi-Fi')) return <Wifi className="w-3 h-3 mr-1" />;
    if (extension.includes('power')) return <Zap className="w-3 h-3 mr-1" />;
    if (extension.includes('video')) return <Monitor className="w-3 h-3 mr-1" />;
    return null;
  };

  return (
    <Card className="w-full max-w-4xl mb-6 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-lg">
              {flightData.flights[0].departure_airport.id} → {flightData.flights[flightData.flights.length - 1].arrival_airport.id}
            </CardTitle>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">${flightData.price.toLocaleString()}</div>
            <div className="text-sm text-gray-500">{flightData.type}</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Flight Route */}
        <div className="space-y-3">
          {flightData.flights.map((flight: Flight, index: number) => (
            <div key={index}>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <img 
                    src={flight.airline_logo} 
                    alt={flight.airline}
                    className="w-8 h-8"
                  />
                  <div>
                    <div className="font-medium text-card">{flight.airline} {flight.flight_number}</div>
                    <div className="text-sm text-gray-600">{flight.airplane}</div>
                    {flight.often_delayed_by_over_30_min && (
                      <Badge variant="outline" className="flex flex-col gap-[-0.5px] items-center justify-center 
                      h-[30px] leading-none text-[10px] bg-orange-100 text-orange-800 px-2">
                        <span>Often</span>
                        <span>Delayed</span>
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-bold text-card">{formatTime(flight.departure_airport.time)}</div>
                    <div className="text-sm text-gray-600">{flight.departure_airport.id}</div>
                    <div className="text-xs text-gray-500 max-w-[120px] truncate">{flight.departure_airport.name}</div>
                  </div>
                  
                  <div className="text-center px-4">
                    <div className="text-sm text-gray-600">{formatDuration(flight.duration)}</div>
                    <div className="w-16 h-px bg-gray-300 my-1"></div>
                    <div className="text-xs text-gray-500">
                      {flight.overnight && <Badge variant="outline" className="text-xs">Overnight</Badge>}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="font-bold text-card">{formatTime(flight.arrival_airport.time)}</div>
                    <div className="text-sm text-gray-600">{flight.arrival_airport.id}</div>
                    <div className="text-xs text-gray-500 max-w-[120px] truncate">{flight.arrival_airport.name}</div>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className="text-sm text-gray-600">{flight.travel_class}</div>
                  <div className="text-xs text-gray-500">{flight.legroom}</div>
                  {flight.ticket_also_sold_by && (
                    <div className="text-xs text-gray-500 mt-1">
                      Also sold by: {flight.ticket_also_sold_by.join(', ')}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Layover */}
              {index < (flightData.layovers?.length || 0) && flightData.layovers && (
                <div className="flex items-center justify-center py-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Layover: {formatLayoverDuration(flightData.layovers[index].duration)} in {flightData.layovers[index].id}</span>
                    {flightData.layovers[index].overnight && (
                      <Badge variant="outline" className="text-xs">Overnight</Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Trip Summary */}
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-medium text-card">Total Travel Time</div>
              <div className="text-lg font-bold text-card">{formatDuration(flightData.total_duration)}</div>
            </div>
          </div>
          <div>
              <div className="text-sm font-medium text-card">Carbon Emissions</div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600" />
                <span className="text-sm text-card">{Math.round(flightData.carbon_emissions.this_flight / 1000)} kg</span>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getEmissionsBadgeColor(flightData.carbon_emissions.difference_percent)}`}
                >
                  {flightData.carbon_emissions.difference_percent > 0 ? '+' : ''}{flightData.carbon_emissions.difference_percent}%
                </Badge>
              </div>
            </div>
        </div>

        {/* Amenities for first flight */}
        {flightData.flights[0].extensions && flightData.flights[0].extensions.length > 0 && (
          <div className="pt-2 border-t">
            <div className="text-sm font-medium mb-2">Flight Amenities</div>
            <div className="flex flex-wrap gap-2">
              {flightData.flights[0].extensions.map((extension: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {getAmenityIcon(extension)}
                  {extension}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FlightSearchResults: React.FC = () => {
    const flightData: FlightData[] = [
        {
      flights: [
        {
          departure_airport: {
            name: "Beijing Capital International Airport",
            id: "PEK",
            time: "2023-10-03T15:10:00"
          },
          arrival_airport: {
            name: "Haneda Airport",
            id: "HND",
            time: "2023-10-03T19:35:00"
          },
          duration: 205,
          airplane: "Boeing 787",
          airline: "ANA",
          airline_logo: "https://www.gstatic.com/flights/airline_logos/70px/NH.png",
          travel_class: "Economy",
          flight_number: "NH 962",
          legroom: "31 in",
          extensions: [
            "Average legroom (31 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "On-demand video",
            "Carbon emissions estimate: 133 kg"
          ]
        },
        {
          departure_airport: {
            name: "Haneda Airport",
            id: "HND",
            time: "2023-10-03T21:05:00"
          },
          arrival_airport: {
            name: "Los Angeles International Airport",
            id: "LAX",
            time: "2023-10-04T15:10:00"
          },
          duration: 605,
          airplane: "Boeing 787",
          airline: "ANA",
          airline_logo: "https://www.gstatic.com/flights/airline_logos/70px/NH.png",
          travel_class: "Economy",
          flight_number: "NH 126",
          ticket_also_sold_by: ["United"],
          legroom: "32 in",
          extensions: [
            "Above average legroom (32 in)",
            "In-seat power & USB outlets",
            "On-demand video",
            "Carbon emissions estimate: 836 kg"
          ],
          overnight: true
        },
        {
          departure_airport: {
            name: "Los Angeles International Airport",
            id: "LAX",
            time: "2023-10-04T19:01:00"
          },
          arrival_airport: {
            name: "Austin-Bergstrom International Airport",
            id: "AUS",
            time: "2023-10-04T23:59:00"
          },
          duration: 178,
          airplane: "Boeing 737MAX 9 Passenger",
          airline: "United",
          airline_logo: "https://www.gstatic.com/flights/airline_logos/70px/UA.png",
          travel_class: "Economy",
          flight_number: "UA 2175",
          legroom: "30 in",
          extensions: [
            "Average legroom (30 in)",
            "Wi-Fi for a fee",
            "In-seat power outlet",
            "Stream media to your device",
            "Carbon emissions estimate: 135 kg"
          ]
        }
      ],
      layovers: [
        {
          duration: 90,
          name: "Haneda Airport",
          id: "HND"
        },
        {
          duration: 231,
          name: "Los Angeles International Airport",
          id: "LAX"
        }
      ],
      total_duration: 1309,
      carbon_emissions: {
        this_flight: 1106000,
        typical_for_this_route: 949000,
        difference_percent: 17
      },
      price: 2512,
      type: "Round trip"
    },
    {
      flights: [
        {
          departure_airport: {
            name: "Beijing Capital International Airport",
            id: "PEK",
            time: "2023-10-03T10:40:00"
          },
          arrival_airport: {
            name: "Incheon International Airport",
            id: "ICN",
            time: "2023-10-03T13:50:00"
          },
          duration: 130,
          airplane: "Airbus A330",
          airline: "Asiana",
          airline_logo: "https://www.gstatic.com/flights/airline_logos/70px/OZ.png",
          travel_class: "Economy",
          flight_number: "OZ 332",
          legroom: "32 in",
          extensions: [
            "Above average legroom (32 in)",
            "In-seat power outlet",
            "On-demand video",
            "Carbon emissions estimate: 84 kg"
          ]
        },
        {
          departure_airport: {
            name: "Incheon International Airport",
            id: "ICN",
            time: "2023-10-03T20:55:00"
          },
          arrival_airport: {
            name: "San Francisco International Airport",
            id: "SFO",
            time: "2023-10-04T15:30:00"
          },
          duration: 635,
          airplane: "Airbus A350",
          airline: "Asiana",
          airline_logo: "https://www.gstatic.com/flights/airline_logos/70px/OZ.png",
          travel_class: "Economy",
          flight_number: "OZ 212",
          legroom: "32 in",
          extensions: [
            "Above average legroom (32 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "On-demand video",
            "Carbon emissions estimate: 619 kg"
          ],
          overnight: true,
          often_delayed_by_over_30_min: true
        },
        {
          departure_airport: {
            name: "San Francisco International Airport",
            id: "SFO",
            time: "2023-10-04T07:40:00"
          },
          arrival_airport: {
            name: "Austin-Bergstrom International Airport",
            id: "AUS",
            time: "2023-10-04T13:10:00"
          },
          duration: 210,
          airplane: "Boeing 737",
          airline: "Alaska",
          airline_logo: "https://www.gstatic.com/flights/airline_logos/70px/AS.png",
          travel_class: "Economy",
          flight_number: "AS 512",
          legroom: "31 in",
          extensions: [
            "Average legroom (31 in)",
            "Wi-Fi for a fee",
            "In-seat power & USB outlets",
            "Stream media to your device",
            "Carbon emissions estimate: 175 kg"
          ]
        }
      ],
      layovers: [
        {
          duration: 425,
          name: "Incheon International Airport",
          id: "ICN"
        },
        {
          duration: 970,
          name: "San Francisco International Airport",
          id: "SFO",
          overnight: true
        }
      ],
      total_duration: 2370,
      carbon_emissions: {
        this_flight: 880000,
        typical_for_this_route: 949000,
        difference_percent: -7
      },
      price: 2513,
      type: "Round trip"
    }
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Flight Search Results</h1>
          <p className="text-primary">Beijing (PEK) to Austin (AUS) • Oct 3 - Oct 9, 2023</p>
        </div>
        
        <div className="space-y-6">
          {flightData.map((flight: FlightData, index: number) => (
            <FlightCard key={index} flightData={flight} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightSearchResults;