import React from 'react'
import  FlightSearchResults from '@/_components/Flights'

function page() {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-4'>
        <div>
          <FlightSearchResults />
        </div>
        <div>Hotels</div>
      </div>
    </div>
  )
}

export default page
