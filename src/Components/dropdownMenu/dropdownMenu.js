import React from 'react'
import './dropdownMenu.css'

const Dropdown = ({ items }) => {
  return (
    <select className='dropdown'>
      {items.map((item) => (
        <option value={item} className='dropdown_item'>
          {item}
        </option>
      ))}
    </select>
  )
}

export default Dropdown
