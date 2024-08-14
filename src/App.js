import './App.css'
import Modal from 'modal-react-cc'
import { useEffect, useState } from 'react'
import state from './lists/states'
import department from './lists/departments'
import Dropdown from './Components/dropdownMenu/dropdownMenu'
import DateInput from './Components/dateTimePicker/dateInput'

function App() {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    console.log(open)
  }, [open])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className='App'>
      <h1>HRnet</h1>
      <a href='/employee-list'>View Current Employees</a>
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type='text' name='first Name' />
        <label>Last Name</label>
        <input type='text' name='Last Name' />
        <label>Date of Birth</label>
        <DateInput />

        <label>Start Date</label>
        <DateInput />
        <fieldset>
          <legend>Address</legend>
          <label>Street</label>
          <input type='text' name='street' />
          <label>City</label>
          <input type='text' name='city' />
          <label>State</label>
          <Dropdown items={state} />
          <label>Zip Code</label>
          <input type='number' name='zip code' />
        </fieldset>

        <label>Department</label>
        <Dropdown items={department} />
      </form>
      <Modal open={open} onClose={handleClose}>
        text
      </Modal>
      <button onClick={() => setOpen(true)}>Save</button>
    </div>
  )
}

export default App
