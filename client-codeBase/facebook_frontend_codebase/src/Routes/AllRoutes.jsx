import React from 'react'
import {Route, Routes} from "react-router-dom"
import SideBar from '../Components/SideBar.jsx'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
        <Route path="/" element={<SideBar />} />
        </Routes>
    </div>
  )
}

export default AllRoutes