import React from 'react'
import { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router-dom"
import SignUp from '../Pages/SignUp.jsx'
import Dashboard from '../Pages/Dashboard.jsx'
import Profile from '../Components/Profile.jsx';
import Loading from '../Components/Loading.jsx';
import Comment from '../Components/Comment.jsx';
const Login = React.lazy(() => import('../Pages/Login.jsx'));


const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Suspense fallback={null}><Login /></Suspense>} />
        <Route path="/dashboard" element={<Suspense fallback={null}><Dashboard /></Suspense>} />
        <Route path="/login" element={<Suspense fallback={null}><Login /></Suspense>} />
        <Route path="/signUp" element={<Suspense fallback={null}><SignUp /></Suspense>} />
        <Route path="/user-profile/:userId" element={<Suspense fallback={null}><Profile /></Suspense>} />
        <Route path="/loading" element={<Suspense fallback={null}><Loading /></Suspense>} />
        <Route path="/comments/:postId" element={<Suspense fallback={null}><Comment /></Suspense>} />
      </Routes>
    </div>
  )
}

export default AllRoutes