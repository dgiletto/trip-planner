"use client"
import React from 'react'
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
    value?: Date
    onChange: (date: Date | undefined) => void
}

function DatePicker({value, onChange}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                id="date"
                className="w-full justify-between font-normal"
            >
                {value ? value.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
            </Button>
        </PopoverTrigger>
        <PopoverContent>
            <Calendar
                mode="single"
                selected={value}
                captionLayout="dropdown"
                onSelect={(date) => {
                    onChange(date)
                    setOpen(false)
                }}
                disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                }}
            />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
