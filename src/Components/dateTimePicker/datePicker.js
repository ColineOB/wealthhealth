import React, { useState } from 'react'

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const getMonthName = (monthIndex) => {
    const monthNames = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ]
    return monthNames[monthIndex]
  }

  //number of days in a month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // change month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day))
  }

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const days = []
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className={`day ${
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear
              ? 'selected'
              : ''
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      )
    }
    return days
  }

  return (
    <div className='date-picker'>
      <div className='header'>
        <button onClick={handlePrevMonth}>{'<'}</button>
        <div>
          {getMonthName(currentMonth)} {currentYear}
        </div>
        <button onClick={handleNextMonth}>{'>'}</button>
      </div>
      <div className='days-container'>{renderDays()}</div>
      <p>Date sélectionnée : {selectedDate.toLocaleDateString()}</p>
    </div>
  )
}

export default DatePicker
