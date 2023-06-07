import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../Components/SideBar'
import { Toast, useToast } from '@chakra-ui/react'
import {getCookies} from '../utils/getData'
import { removeCookies} from '../utils/removeData'

const Dashboard = () => {
  const navigate = useNavigate()
  const token = getCookies("fb_token")
  const toast = useToast()

  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [])

  const logout = () => {
    removeCookies("fb_token")
    navigate("/login")
  }
  return (
    <div>
      <SideBar logout={logout} />
    </div>
  )
}

export default Dashboard