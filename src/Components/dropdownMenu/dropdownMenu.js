import React, { useEffect, useRef, useState } from 'react'
import './dropdownMenu.css'

const Dropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(() =>
    items.length > 0 ? items[0] : 'menu'
  )
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const clickItem = (item) => {
    setTitle(item)
    setIsOpen(false)
    toggleDropdown()
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='dropdown' ref={dropdownRef}>
      <button className='dropdown-toggle' onClick={toggleDropdown}>
        {title}
      </button>
      {isOpen && (
        <div className='dropdown-menu'>
          {items.map((item) => (
            <span
              className='dropdown-menu_item'
              onClick={() => clickItem(item)}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
