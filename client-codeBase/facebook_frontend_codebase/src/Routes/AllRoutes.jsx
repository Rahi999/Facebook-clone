import React from 'react'
import {Route, Routes} from "react-router-dom"
import Login from '../Pages/Login.jsx'
import SignUp from '../Pages/SignUp.jsx'
import Dashboard from '../Pages/Dashboard.jsx'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
    </div>
  )
}

export default AllRoutes