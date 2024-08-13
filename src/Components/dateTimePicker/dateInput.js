import { useEffect, useRef, useState } from 'react'
import DatePicker from './datePicker'

const DateInput = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const inputRef = useRef(null)

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleInputClick = () => {
    setShowDatePicker(!showDatePicker)
  }

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setShowDatePicker(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className='date-input' ref={inputRef}>
      <input
        type='text'
        readOnly
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        onClick={handleInputClick}
      />
      {showDatePicker && (
        <DatePicker
          selectedDate={selectedDate || new Date()}
          setSelectedDate={handleDateChange}
        />
      )}
    </div>
  )
}

export default DateInput
