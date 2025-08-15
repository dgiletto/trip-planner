import React from 'react'
import  FlightSearchResults from '@/_components/Flights'
import HotelSearchResults from '@/_components/Hotels'
import ActivitySuggestions from '@/_components/SuggestedActivities'

function page() {
  return (
    <div>
      <div className='flex flex-col items-center gap-5 p-4'>
        <div>
          <FlightSearchResults />
        </div>
        <div>
          <HotelSearchResults />
        </div>
        <div>
          <ActivitySuggestions />
        </div>
      </div>
    </div>
  )
}

export default page
