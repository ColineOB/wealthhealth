import React, { useState } from 'react'
import './datePicker.css'

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const todayDate = new Date()

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const datNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getMonthName = (monthIndex) => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
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
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const days = []
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear
    const daysInPreviousMonth = getDaysInMonth(previousMonth, previousYear)

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <td key={`prev-${i}`} className='day other-month'>
          {daysInPreviousMonth - (firstDayOfMonth - i) + 1}
        </td>
      )
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <td
          key={day}
          className={`day ${
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear
              ? 'selected'
              : todayDate.getDate() === day
                ? 'today'
                : ''
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </td>
      )
    }

    const totalCells = days.length
    console.log('totalCells', totalCells)

    const nextMonthDays = (7 - (totalCells % 7)) % 7
    console.log('nextMonthDays', nextMonthDays)

    for (let i = 1; i <= nextMonthDays; i++) {
      days.push(
        <td key={`next-${i}`} className='day other-month'>
          {i}
        </td>
      )
    }

    const weeks = []
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7))
    }

    return weeks.map((week, index) => <tr key={index}>{week}</tr>)
  }

  return (
    <div className='date-picker'>
      <div className='header'>
        <button onClick={handlePrevMonth}>{'◄'}</button>
        <div>
          {getMonthName(currentMonth)} {currentYear}
        </div>
        <button onClick={handleNextMonth}>{'►'}</button>
      </div>
      <table>
        <thead>
          <tr>
            {datNames.map((datName) => (
              <th>{datName}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderDays()}</tbody>
      </table>
      <p>{selectedDate.toLocaleDateString()}</p>
    </div>
  )
}

export default DatePicker
