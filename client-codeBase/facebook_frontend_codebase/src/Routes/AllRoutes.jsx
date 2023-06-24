import React from 'react'
import { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router-dom"
import SignUp from '../Pages/SignUp.jsx'
import Dashboard from '../Pages/Dashboard.jsx'
import Profile from '../Components/Profile.jsx';
import Loading from '../Components/Loading.jsx';
import Comment from '../Components/Comment.jsx';
import Comments from '../Pages/Comments.jsx';
import UserProfile from '../Components/Userprofile.jsx';
import DetailedPostImage from '../Components/DetailedPostImage.jsx';
import Chat from '../Components/Chat.jsx';
import ChatLists from '../Components/ChatLists.jsx';
import Messages from '../Components/Messages.jsx';
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
        <Route path="/users-profile/:userId" element={<Suspense fallback={null}><UserProfile /></Suspense>} />
        <Route path="/detailed-image/:src" element={<Suspense fallback={null}><DetailedPostImage /></Suspense>} />
        <Route path="/loading" element={<Suspense fallback={null}><Loading /></Suspense>} />
        <Route path="/chat" element={<Suspense fallback={null}><Chat /></Suspense>} />
        <Route path="/chatLists" element={<Suspense fallback={null}><ChatLists /></Suspense>} />
        <Route path="/messages/:senderId/:receiverId" element={<Suspense fallback={null}><Messages /></Suspense>} />
        <Route path="/comments/:postId" element={<Suspense fallback={null}><Comments /></Suspense>} />
      </Routes>
    </div>
  )
}

export default AllRoutes