import './App.css'
import Modal from 'modal-react-cc'
import { useContext } from 'react'
import state from './lists/states'
import department from './lists/departments'
import Dropdown from './Components/dropdownMenu/dropdownMenu'
import DateInput from './Components/dateTimePicker/dateInput'
import { FormContext } from './Context/formProvider'

function App() {
  const {
    formData,
    handleInputChange,
    handleSubmit,
    open,
    handleClose,
    setFormData
  } = useContext(FormContext)

  return (
    <div className='App'>
      <h1>HRnet</h1>
      <a href='/employee-list'>View Current Employees</a>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type='text' name='firstName' onChange={handleInputChange} />
        <label>Last Name</label>
        <input type='text' name='lastName' onChange={handleInputChange} />
        <label>Date of Birth</label>
        <DateInput
          name='dateOfBirth'
          value={formData.dateOfBirth}
          onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
        />

        <label>Start Date</label>
        <DateInput
          name='startDate'
          value={formData.startDate}
          onChange={(date) => setFormData({ ...formData, startDate: date })}
        />
        <fieldset>
          <legend>Address</legend>
          <label>Street</label>
          <input type='text' name='street' onChange={handleInputChange} />
          <label>City</label>
          <input type='text' name='city' onChange={handleInputChange} />
          <label>State</label>
          <Dropdown
            items={state}
            onChange={(state) => setFormData({ ...formData, state })}
          />
          <label>Zip Code</label>
          <input type='number' name='zipCode' onChange={handleInputChange} />
        </fieldset>

        <label>Department</label>
        <Dropdown
          items={department}
          onChange={(dept) => setFormData({ ...formData, department: dept })}
        />
        <button type='submit'>Save</button>
      </form>
      <Modal open={open} onClose={handleClose}>
        text
      </Modal>
    </div>
  )
}

export default App
