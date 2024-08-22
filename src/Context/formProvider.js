import React, { createContext, useState } from 'react'

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

  const handleSubmit = (e) => {
    e.preventDefault()
    const uniqueId = Date.now()
    const employeeData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      startDate: formData.startDate,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode.toString(),
      department: formData.department
    }
    localStorage.setItem(
      `employeeFormData-${uniqueId}`,
      JSON.stringify(employeeData)
    )
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
