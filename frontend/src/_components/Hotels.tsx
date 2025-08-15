"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Clock, 
  Wifi, 
  Car, 
  Waves, 
  Utensils, 
  Dumbbell,
  Coffee,
  Users,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Tag,
} from 'lucide-react';

// Type definitions
interface GPSCoordinates {
  latitude: number;
  longitude: number;
}

interface RatePerNight {
  lowest: string;
  extracted_lowest: number;
  before_taxes_fees: string;
  extracted_before_taxes_fees: number;
}

interface TotalRate {
  lowest: string;
  extracted_lowest: number;
  before_taxes_fees: string;
  extracted_before_taxes_fees: number;
}

interface Price {
  source: string;
  logo?: string;
  rate_per_night: RatePerNight;
}

interface Transportation {
  type: string;
  duration: string;
}

interface NearbyPlace {
  name: string;
  transportations: Transportation[];
}

interface HotelImage {
  thumbnail: string;
  original_image: string;
}

interface Rating {
  stars: number;
  count: number;
}

interface ReviewBreakdown {
  name: string;
  description: string;
  total_mentioned: number;
  positive: number;
  negative: number;
  neutral: number;
}

interface HotelData {
  type: string;
  name: string;
  description: string;
  logo?: string;
  link?: string;
  sponsored?: boolean;
  gps_coordinates: GPSCoordinates;
  check_in_time: string;
  check_out_time: string;
  rate_per_night: RatePerNight;
  total_rate?: TotalRate;
  deal?: string;
  deal_description?: string;
  prices?: Price[];
  nearby_places: NearbyPlace[];
  hotel_class: string;
  extracted_hotel_class: number;
  images: HotelImage[];
  overall_rating: number;
  reviews: number;
  ratings?: Rating[];
  location_rating: number;
  reviews_breakdown: ReviewBreakdown[];
  amenities: string[];
  property_token: string;
  serpapi_property_details_link: string;
}

interface HotelCardProps {
  hotelData: HotelData;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotelData }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === hotelData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? hotelData.images.length - 1 : prev - 1
    );
  };

  const getStarRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getAmenityIcon = (amenity: string): React.ReactNode => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wi-fi') || amenityLower.includes('wifi')) 
      return <Wifi className="w-4 h-4" />;
    if (amenityLower.includes('parking') || amenityLower.includes('car')) 
      return <Car className="w-4 h-4" />;
    if (amenityLower.includes('pool') || amenityLower.includes('beach')) 
      return <Waves className="w-4 h-4" />;
    if (amenityLower.includes('restaurant') || amenityLower.includes('dining')) 
      return <Utensils className="w-4 h-4" />;
    if (amenityLower.includes('fitness') || amenityLower.includes('gym')) 
      return <Dumbbell className="w-4 h-4" />;
    if (amenityLower.includes('breakfast') || amenityLower.includes('coffee')) 
      return <Coffee className="w-4 h-4" />;
    if (amenityLower.includes('child') || amenityLower.includes('family')) 
      return <Users className="w-4 h-4" />;
    return null;
  };

  const getReviewSentiment = (breakdown: ReviewBreakdown) => {
    const positivePercentage = (breakdown.positive / breakdown.total_mentioned) * 100;
    if (positivePercentage >= 80) return { color: 'bg-green-100 text-green-800', label: 'Excellent' };
    if (positivePercentage >= 60) return { color: 'bg-blue-100 text-blue-800', label: 'Good' };
    if (positivePercentage >= 40) return { color: 'bg-yellow-100 text-yellow-800', label: 'Mixed' };
    return { color: 'bg-red-100 text-red-800', label: 'Poor' };
  };

  const formatPrice = (price: string) => {
    return price.replace('$', '');
  };

  return (
    <Card className="w-full max-w-5xl mb-6 hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex">
        {/* Image Gallery */}
        <div className="relative w-80 h-105 flex-shrink-0">
          {hotelData.images.length > 0 && (
            <>
              <img
                src={hotelData.images[currentImageIndex].original_image}
                alt={hotelData.name}
                className="w-full h-full object-cover"
              />
              {hotelData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-75 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {hotelData.images.slice(0, 5).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              {hotelData.deal && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-red-500 text-white">
                    <Tag className="w-3 h-3 mr-1" />
                    {hotelData.deal}
                  </Badge>
                </div>
              )}
              {hotelData.sponsored && (
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-white bg-opacity-90">
                    Sponsored
                  </Badge>
                </div>
              )}
            </>
          )}
        </div>

        {/* Hotel Info */}
        <div className="flex-1 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-xl text-blue-600">
                    {hotelData.name}
                  </CardTitle>
                  {hotelData.link && (
                    <a href={hotelData.link} target="_blank">
                        <ExternalLink className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                    </a>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1">
                    {getStarRating(hotelData.extracted_hotel_class)}
                  </div>
                  <span className="text-sm text-gray-400">{hotelData.hotel_class}</span>
                </div>

                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {getStarRating(hotelData.overall_rating)}
                    </div>
                    <span className="text-sm font-medium">{hotelData.overall_rating}</span>
                    <span className="text-sm text-gray-400">({hotelData.reviews.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Location: {hotelData.location_rating}/5</span>
                  </div>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                  {hotelData.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="text-right ml-4">
                <div className="mb-1">
                  {hotelData.rate_per_night.before_taxes_fees !== hotelData.rate_per_night.lowest && (
                    <div className="text-sm text-gray-500 line-through">
                      ${formatPrice(hotelData.rate_per_night.lowest)}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-green-600">
                    ${formatPrice(hotelData.rate_per_night.before_taxes_fees)}
                  </div>
                  <div className="text-sm text-gray-500">per night</div>
                </div>
                {hotelData.total_rate && (
                  <div className="text-sm text-gray-400">
                    Total: ${formatPrice(hotelData.total_rate.before_taxes_fees)}
                  </div>
                )}
                {hotelData.deal_description && (
                  <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                    {hotelData.deal_description}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 pt-0">
            {/* Check-in/out times */}
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Check-in: {hotelData.check_in_time}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Check-out: {hotelData.check_out_time}</span>
              </div>
            </div>

            {/* Nearby Places */}
            {hotelData.nearby_places.length > 0 && (
              <div className="mb-3">
                <div className="text-sm font-medium mb-1">Nearby</div>
                <div className="flex flex-wrap gap-2">
                  {hotelData.nearby_places.slice(0, 3).map((place, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {place.name} • {place.transportations[0]?.duration} by {place.transportations[0]?.type.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Top Amenities */}
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Popular Amenities</div>
              <div className="flex flex-wrap gap-2">
                {hotelData.amenities.slice(0, 8).map((amenity, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {getAmenityIcon(amenity)}
                    <span className={getAmenityIcon(amenity) ? 'ml-1' : ''}>{amenity}</span>
                  </Badge>
                ))}
                {hotelData.amenities.length > 8 && (
                  <Badge variant="outline" className="text-xs text-gray-500">
                    +{hotelData.amenities.length - 8} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Review Breakdown */}
            {hotelData.reviews_breakdown.length > 0 && (
              <div className="mb-4">
                <div className="text-sm font-medium mb-2">Guest Reviews</div>
                <div className="flex flex-wrap gap-2">
                  {hotelData.reviews_breakdown.slice(0, 3).map((breakdown, index) => {
                    const sentiment = getReviewSentiment(breakdown);
                    return (
                      <Badge key={index} variant="outline" className={`text-xs ${sentiment.color}`}>
                        {breakdown.name}: {sentiment.label} ({breakdown.total_mentioned})
                      </Badge>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

// Sample component showing hotel search results
const HotelSearchResults: React.FC = () => {
  const hotelData: HotelData[] = [
    {
      type: "hotel",
      name: "The Ritz-Carlton, Bali",
      description: "Zen-like quarters, some with butler service, in an upscale property offering refined dining & a spa.",
      logo: "https://www.gstatic.com/travel-hotels/branding/df3424c9-7799-4d27-aeb5-cdcabf8bf950.png",
      sponsored: true,
      gps_coordinates: {
        latitude: -8.830670999999999,
        longitude: 115.21533099999999
      },
      check_in_time: "3:00 PM",
      check_out_time: "12:00 PM",
      rate_per_night: {
        lowest: "$347",
        extracted_lowest: 347,
        before_taxes_fees: "$287",
        extracted_before_taxes_fees: 287
      },
      nearby_places: [
        {
          name: "I Gusti Ngurah Rai International Airport",
          transportations: [{ type: "Taxi", duration: "29 min" }]
        },
        {
          name: "Bejana, Indonesian Restaurant",
          transportations: [{ type: "Walking", duration: "1 min" }]
        }
      ],
      hotel_class: "5-star hotel",
      extracted_hotel_class: 5,
      images: [
        {
          thumbnail: "https://lh3.googleusercontent.com/proxy/3GU0rF7c5y00MbsWRPAkzdY0Mql0YhH7coFNK9nRDE8GwlzsRbc7xHB8lu8ZN6ApPUiuM7GvjB4RWoJaQCcD4kjARaoyDitH27WhWiAdz8dfG4TCY6pafMo52UQH5W76rgH3JESuGN3ohZ20fEwSgBKGmdQZOA=s287-w287-h192-n-k-no-v1",
          original_image: "https://d2hyz2bfif3cr8.cloudfront.net/imageRepo/7/0/151/470/91/rz-dpssw-private-pool-29237_Classic-Hor_O.jpg"
        },
        {
          thumbnail: "https://lh5.googleusercontent.com/proxy/IUakfiu-4guLHoPdx1ippkGtRxwdDW9pxf3j8kRq8FtIKOnnCepdr1DBB1vDftDvbY1IDqTCsgzrvgXdzBB6sJU8-z-7yawWRg-tsLlqSy9XI9mbudAurUnJBm9tmF4sJJFZXkuiyUc7zaNMZ6XPZ3MJDhEzWw=s287-w287-h192-n-k-no-v1",
          original_image: "https://d2hyz2bfif3cr8.cloudfront.net/imageRepo/7/0/147/874/299/dpssw-villa-0105-hor-clsc_O.jpg"
        }
      ],
      overall_rating: 4.6,
      reviews: 3614,
      location_rating: 2.8,
      reviews_breakdown: [
        {
          name: "Property",
          description: "Property",
          total_mentioned: 605,
          positive: 534,
          negative: 44,
          neutral: 27
        },
        {
          name: "Service",
          description: "Service",
          total_mentioned: 599,
          positive: 507,
          negative: 74,
          neutral: 18
        }
      ],
      amenities: [
        "Free Wi-Fi", "Free parking", "Pools", "Hot tub", "Air conditioning",
        "Fitness centre", "Spa", "Beach access", "Bar", "Restaurant",
        "Room service", "Kitchen in some rooms", "Airport shuttle"
      ],
      property_token: "ChcIyo2FjdjsrkZ8xGgsvZy8xdGYyMTV2aBAB",
      serpapi_property_details_link: "https://serpapi.com/search.json?example"
    },
    {
      type: "hotel",
      name: "Anantara Uluwatu Bali Resort",
      description: "Chic suites with in-room bars & high-end sound systems, plus restaurants, a spa & an infinity pool.",
      link: "https://www.anantara.com/uluwatu-bali",
      gps_coordinates: {
        latitude: -8.8085355,
        longitude: 115.107911
      },
      check_in_time: "3:00 PM",
      check_out_time: "12:00 PM",
      rate_per_night: {
        lowest: "$247",
        extracted_lowest: 247,
        before_taxes_fees: "$199",
        extracted_before_taxes_fees: 199
      },
      total_rate: {
        lowest: "$1,233",
        extracted_lowest: 1233,
        before_taxes_fees: "$994",
        extracted_before_taxes_fees: 994
      },
      deal: "27% less than usual",
      deal_description: "Great Deal",
      nearby_places: [
        {
          name: "Padang Padang Beach",
          transportations: [{ type: "Taxi", duration: "10 min" }]
        }
      ],
      hotel_class: "5-star hotel",
      extracted_hotel_class: 5,
      images: [
        {
          thumbnail: "https://lh5.googleusercontent.com/p/AF1QipOWiZ-Gb1n4TFh_g0UJSqViox2Gt5X30ESdFIg9=s287-w287-h192-n-k-no-v1",
          original_image: "https://lh5.googleusercontent.com/p/AF1QipOWiZ-Gb1n4TFh_g0UJSqViox2Gt5X30ESdFIg9=s10000"
        }
      ],
      overall_rating: 4.5,
      reviews: 2210,
      location_rating: 3.6,
      reviews_breakdown: [
        {
          name: "Service",
          description: "Service",
          total_mentioned: 397,
          positive: 324,
          negative: 53,
          neutral: 20
        }
      ],
      amenities: [
        "Breakfast", "Free Wi-Fi", "Free parking", "Pools", "Spa",
        "Beach access", "Restaurant", "Bar", "Fitness centre"
      ],
      property_token: "F3cIyo2Fjdjs2uZ8xGgsvZy8xdGYyMTV2aBAB",
      serpapi_property_details_link: "https://serpapi.com/search.json?example2"
    }
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Hotel Search Results</h1>
          <p className="text-primary">Bali Resorts • Check-in May 30 - Check-out May 31, 2025</p>
        </div>
        
        <div className="space-y-6">
          {hotelData.map((hotel, index) => (
            <HotelCard key={index} hotelData={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelSearchResults;
