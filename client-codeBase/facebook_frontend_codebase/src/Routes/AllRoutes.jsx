import React from 'react'
import { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router-dom"
import SignUp from '../Pages/SignUp.jsx'
import Dashboard from '../Pages/Dashboard.jsx'
const Login = React.lazy(() => import('../Pages/Login.jsx'));


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Suspense fallback={null}><Dashboard /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={null}><Login /></Suspense>} />
        <Route path="/signUp" element={<Suspense fallback={null}><SignUp /></Suspense>} />
      </Routes>
    </div>
  )
}

export default AllRoutes