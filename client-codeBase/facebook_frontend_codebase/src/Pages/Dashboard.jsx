import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import { Toast, useToast } from '@chakra-ui/react'

const Dashboard = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('fb_token')
  const toast = useToast()

  useEffect(()=> {
    if(!token){
      toast({
        title: "Looks like you're not logged in!",
        description: "Please login to continue.",
        position: "top",
        status: 'info',
        duration: 3000,
        isClosable: true,
      })
      navigate("/login")
    }
  },[])

  const logout = () => {
    localStorage.removeItem('fb_token')
  }
  return (
    <div>
      <SideBar logout={logout} />
    </div>
  )
}

export default Dashboard