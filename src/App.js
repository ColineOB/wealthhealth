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
        <label>
          First Name
          <input type='text' name='first Name' />
        </label>
        <label>
          Last Name
          <input type='text' name='Last Name' />
        </label>
        <label>
          Date of Birth
          <DateInput />
        </label>

        <label>
          Start Date
          <DateInput />
        </label>
        <fieldset>
          <legend>Address</legend>
          <label>
            Street
            <input type='text' name='street' />
          </label>
          <label>
            City
            <input type='text' name='city' />
          </label>
          <label>
            State
            <Dropdown items={state} />
          </label>
          <label>
            Zip Code
            <input type='number' name='zip code' />
          </label>
        </fieldset>

        <label>
          Department
          <Dropdown items={department} />
        </label>
      </form>
      <Modal open={open} onClose={handleClose}>
        text
      </Modal>
      <button onClick={() => setOpen(true)}>Save</button>
    </div>
  )
}

export default App
