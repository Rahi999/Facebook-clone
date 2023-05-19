import React from 'react'
import {Route, Routes} from "react-router-dom"
import SideBar from '../Components/SideBar.jsx'
import Login from '../Pages/Login.jsx'
import SignUp from '../Pages/SignUp.jsx'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<SideBar />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
        </Routes>
    </div>
  )
}

export default AllRoutes