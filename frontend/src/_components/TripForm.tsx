"use client"
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import DatePicker from './DatePicker'

function TripForm() {
  const [formData, setFormData] = React.useState({
    departureAirport: "",
    destination: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    numPeople: "",
    budget: "",
    tripType: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({...prev, [id]: value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="flex-col">
        <div className='mt-24 flex justify-center'>
            {/* Header */}
            <div className="max-w-3xl w-full text-center">
                <h1 className="text-xl md:text-5xl font-bold">Start Planning Your Trip Instantly!</h1>
                <p className="mt-5">We'll handle all of the hard work: flights, hotels, and suggest activities in seconds</p>
            </div>
        </div>
      {/* Form */}
      <div className='my-15 flex justify-center'>
        <div className="max-w-xl w-full text-center">
            <Card>
                <CardHeader>
                    <CardTitle>Trip Form</CardTitle>
                    <CardDescription>Enter your where you are coming from, your desired destination, depature date, return date,
                        number of people going, budget, and trip style
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid">
                            <Label htmlFor="departureAirport" className="mb-2">Airport of Departure</Label>
                            <Input 
                                id="departureAirport"
                                type="text"
                                placeholder="John F. Kennedy International Airport"
                                required
                                value={formData.departureAirport}
                                onChange={handleChange}
                            />
                            <Label htmlFor="destination" className="mt-5 mb-2">Destination</Label>
                            <Input 
                                id="destination"
                                type="text"
                                placeholder="London"
                                required
                                value={formData.destination}
                                onChange={handleChange}
                            />
                            <div className="flex gap-5">
                                <div className="w-14 flex-auto">
                                    <Label htmlFor="start-date" className="mt-5 mb-2">Start Date</Label>
                                    <DatePicker 
                                        value={formData.startDate}
                                        onChange={(date) => setFormData(prev => ({...prev, startDate: date}))}
                                    />
                                </div>
                                <div className="w-14 flex-auto">
                                    <Label htmlFor="return-date" className="mt-5 mb-2">Return Date</Label>
                                    <DatePicker 
                                        value={formData.endDate}
                                        onChange={(date) => setFormData(prev => ({...prev, endDate: date}))}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-14 flex-auto">
                                    <Label htmlFor="numPeople" className="mt-5 mb-2">Number of People</Label>
                                    <Input 
                                        id="numPeople"
                                        type="number"
                                        placeholder="2"
                                        required
                                        value={formData.numPeople}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-14 flex-auto">
                                    <Label htmlFor="budget" className="mt-5 mb-2">Budget ($)</Label>
                                    <Input 
                                        id="budget"
                                        type="number"
                                        placeholder="1,000"
                                        required
                                        value={formData.budget}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <Label htmlFor="tripType" className="mt-5 mb-2">Type of Trip</Label>
                            <Input 
                                id="tripType"
                                type="text"
                                placeholder="Romantic, Adventurous, Relaxing, etc."
                                required
                                value={formData.tripType}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" className="w-sm m-auto mt-8 cursor-pointer">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

export default TripForm
