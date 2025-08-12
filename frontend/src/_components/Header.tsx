import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className="flex justify-between items-center p-4">
        {/* Logo */}
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt="logo" width={20} height={20} />
            <h2 className="font-bold text-2xl">AI Trip Planner</h2>
        </div>
        {/* Get Started Button */}
        <Button>Get Started</Button>
    </div>
  )
}

export default Header
