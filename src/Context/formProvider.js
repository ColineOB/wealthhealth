import React, { createContext, useState } from 'react'
import state from '../lists/states'
import department from '../lists/departments'

export const FormContext = createContext()

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: ''
  })
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  function date(dateNow) {
    return dateNow || new Date()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let storedEmployees = JSON.parse(localStorage.getItem('employeeFormData'))
    if (!Array.isArray(storedEmployees)) {
      storedEmployees = []
    }
    const newId = storedEmployees.length + 1
    const employeeData = {
      id: newId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: date(formData.dateOfBirth),
      startDate: date(formData.startDate),
      street: formData.street,
      city: formData.city,
      state: formData.state || state[0],
      zipCode: formData.zipCode.toString(),
      department: formData.department || department[0]
    }
    storedEmployees.push(employeeData)
    localStorage.setItem('employeeFormData', JSON.stringify(storedEmployees))
    setOpen(true)
  }

  return (
    <FormContext.Provider
      value={{
        formData,
        setFormData,
        open,
        handleClose,
        handleInputChange,
        handleSubmit
      }}
    >
      {children}
    </FormContext.Provider>
  )
}
