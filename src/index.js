import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import EmployeeList from './pages/employee-list/employeeList'
import { FormProvider } from './Context/formProvider'
import { TableProvider } from './Context/tableProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route
            path='/employee-list'
            element={
              <TableProvider>
                <EmployeeList />
              </TableProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
