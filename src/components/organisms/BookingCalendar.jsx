import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isAfter, isBefore, addMonths, subMonths } from 'date-fns';
import Button from '@/components/atoms/Button';
import PriceDisplay from '@/components/atoms/PriceDisplay';
import ApperIcon from '@/components/ApperIcon';

const BookingCalendar = ({ 
  propertyId, 
  basePrice, 
  bookedDates = [], 
  onDateSelect,
  className = '' 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({
    checkIn: null,
    checkOut: null
  });
  const [isSelectingCheckOut, setIsSelectingCheckOut] = useState(false);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      isSameDay(new Date(bookedDate), date)
    );
  };

  const isDateSelectable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return !isBefore(date, today) && !isDateBooked(date);
  };

  const isDateInRange = (date) => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return false;
    return isAfter(date, selectedDates.checkIn) && isBefore(date, selectedDates.checkOut);
  };

  const handleDateClick = (date) => {
    if (!isDateSelectable(date)) return;

    if (!selectedDates.checkIn || isSelectingCheckOut) {
      if (!selectedDates.checkIn) {
        setSelectedDates({ checkIn: date, checkOut: null });
        setIsSelectingCheckOut(true);
      } else {
        if (isAfter(date, selectedDates.checkIn)) {
          setSelectedDates(prev => ({ ...prev, checkOut: date }));
          setIsSelectingCheckOut(false);
          onDateSelect?.({ checkIn: selectedDates.checkIn, checkOut: date });
        } else {
          setSelectedDates({ checkIn: date, checkOut: null });
          setIsSelectingCheckOut(true);
        }
      }
    } else {
      setSelectedDates({ checkIn: date, checkOut: null });
      setIsSelectingCheckOut(true);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const getDayClassName = (date) => {
    const baseClasses = "calendar-day";
    
    if (!isDateSelectable(date)) {
      return `${baseClasses} booked`;
    }
    
    if (selectedDates.checkIn && isSameDay(date, selectedDates.checkIn)) {
      return `${baseClasses} selected`;
    }
    
    if (selectedDates.checkOut && isSameDay(date, selectedDates.checkOut)) {
      return `${baseClasses} selected`;
    }
    
    if (isDateInRange(date)) {
      return `${baseClasses} in-range`;
    }
    
    return `${baseClasses} available`;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calculateTotalPrice = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    
    const nights = Math.ceil((selectedDates.checkOut - selectedDates.checkIn) / (1000 * 60 * 60 * 24));
    return nights * basePrice;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-xl shadow-card p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg">Select Dates</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="small" onClick={prevMonth}>
            <ApperIcon name="ChevronLeft" className="w-4 h-4" />
          </Button>
          <span className="font-medium min-w-[120px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <Button variant="ghost" size="small" onClick={nextMonth}>
            <ApperIcon name="ChevronRight" className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Week Days Header */}
        <div className="calendar-grid mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="calendar-grid border rounded-lg overflow-hidden">
          {days.map(date => (
            <div
              key={date.toISOString()}
              className={getDayClassName(date)}
              onClick={() => handleDateClick(date)}
            >
              <span className={!isSameMonth(date, currentMonth) ? 'text-gray-300' : ''}>
                {format(date, 'd')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Dates Summary */}
      {selectedDates.checkIn && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="text-sm text-gray-500">Check-in</div>
              <div className="font-medium">
                {format(selectedDates.checkIn, 'MMM dd, yyyy')}
              </div>
            </div>
            {selectedDates.checkOut && (
              <div>
                <div className="text-sm text-gray-500">Check-out</div>
                <div className="font-medium">
                  {format(selectedDates.checkOut, 'MMM dd, yyyy')}
                </div>
              </div>
            )}
          </div>
          
          {selectedDates.checkOut && (
            <div className="flex items-center justify-between pt-3 border-t">
              <div>
                <span className="text-sm text-gray-500">Total for </span>
                <span className="font-medium">
                  {Math.ceil((selectedDates.checkOut - selectedDates.checkIn) / (1000 * 60 * 60 * 24))} nights
                </span>
              </div>
              <PriceDisplay amount={calculateTotalPrice()} size="large" />
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary-500 rounded"></div>
          <span>Selected</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCalendar;