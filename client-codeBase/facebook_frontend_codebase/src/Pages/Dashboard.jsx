import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import { Toast, useToast } from '@chakra-ui/react'
import getData from '../utils/getData'
import removeData from '../utils/removeData'

const Dashboard = () => {
  const navigate = useNavigate()
  const token = getData("fb_token")
  const toast = useToast()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [])

  const logout = () => {
    removeData("fb_token")
    navigate("/login")
  }
  return (
    <div>
      <SideBar logout={logout} />
    </div>
  )
}

export default Dashboard