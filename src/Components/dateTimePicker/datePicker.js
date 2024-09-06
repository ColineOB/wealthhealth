import React, { useState } from 'react'
import './datePicker.css'

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  const initialDate = selectedDate || new Date()

  const todayDate = new Date()
  const todayYear = todayDate.getFullYear()

  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth())
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear())

  const datNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
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

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const handlePrevMonth = (event) => {
    event.preventDefault()
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const handleNextMonth = (event) => {
    event.preventDefault()
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
            initialDate.getDate() === day &&
            initialDate.getMonth() === currentMonth &&
            initialDate.getFullYear() === currentYear
              ? 'selected'
              : todayDate.getDate() === day &&
                  todayDate.getMonth() === currentMonth &&
                  todayDate.getFullYear() === currentYear
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
    const nextMonthDays = (7 - (totalCells % 7)) % 7

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

  const yearsList = () => {
    const finalYear = 1899
    const years = []
    const nbYears = todayYear - finalYear

    for (let i = 0; i < nbYears; i++) {
      let year = todayYear - i
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      )
    }
    return years
  }

  const returnToday = () => {
    setSelectedDate(todayDate)
    setCurrentMonth(todayDate.getMonth())
    setCurrentYear(todayDate.getFullYear())
    renderDays()
  }

  return (
    <div className='date-picker'>
      <div className='header'>
        <button onClick={handlePrevMonth}>{'◄'}</button>
        <div>
          <button onClick={returnToday}>{'⌂'}</button>
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
          >
            {yearsList()}
          </select>
        </div>
        <button onClick={handleNextMonth}>{'►'}</button>
      </div>
      <table>
        <thead>
          <tr>
            {datNames.map((datName, index) => (
              <th key={index}>{datName}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderDays()}</tbody>
      </table>
      <p>
        {selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}
      </p>
    </div>
  )
}

export default DatePicker
