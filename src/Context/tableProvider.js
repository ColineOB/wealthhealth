import React, { createContext, useState, useEffect, useMemo } from 'react'

export const TableContext = createContext()

export const TableProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState([])

  function formatDate(dateString) {
    let dateS = dateString
    const date = new Date(dateS)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    const employeeData = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key.startsWith('employeeFormData-')) {
        const employee = JSON.parse(localStorage.getItem(key))
        employeeData.push({
          'First Name': employee.firstName || 'unknown',
          'Last Name': employee.lastName || 'unknown',
          'Start Date': formatDate(employee.startDate) || 'unknown',
          Department: employee.department || 'unknown',
          'Date of Birth': formatDate(employee.dateOfBirth) || 'unknown',
          Street: employee.street || 'unknown',
          City: employee.city || 'unknown',
          State: employee.state || 'unknown',
          'Zip Code': employee.zipCode || '00000'
        })
      }
    }
    setData(employeeData)
  }, [])

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
  }, [data, searchTerm])

  return (
    <TableContext.Provider
      value={{
        data,
        setData,
        searchTerm,
        setSearchTerm,
        pageSize,
        setPageSize,
        sorting,
        setSorting,
        filteredData
      }}
    >
      {children}
    </TableContext.Provider>
  )
}
