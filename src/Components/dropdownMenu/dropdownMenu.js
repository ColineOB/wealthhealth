import React, { useState } from 'react'
import './dropdownMenu.css'

const Dropdown = ({ items, onChange }) => {
  const [selectedValue, setSelectedValue] = useState(items[0])

  const handleChange = (event) => {
    const value = event.target.value
    setSelectedValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <select className='dropdown' value={selectedValue} onChange={handleChange}>
      {items.map((item, index) => (
        <option key={index} value={item} className='dropdown_item'>
          {item}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
