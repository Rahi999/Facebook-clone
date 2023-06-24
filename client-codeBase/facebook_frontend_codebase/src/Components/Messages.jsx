import { Box, VStack, Avatar, Text, Input, Button, Flex, Toast, useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from "react";
import SideBar from './SideBar';
import { getCookies } from '../utils/getData';
import axios from 'axios';
import "./message.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Messages = ({ senderId, receiverId }) => {

  const [text, setText] = useState('')
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = getCookies("userId")
  const token = getCookies("fb_token")
  const params = useParams()
  const toast = useToast()
  const navigate = useNavigate()

  const handleInputChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const getMessages = () => {
    axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/chat/get-messages/${userId}/${params.receiverId}`,
      { headers: { "Authorization": `${token}` } })
      .then((res) => {
        setMessages(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSendMessages = () => {
    if (text) {
      const payload = {
        senderId: userId,
        receiverId: params.receiverId,
        message: text
      }
      console.log(payload)
      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/chat/send-messages`,
        payload,
        { headers: { "Authorization": `${token}` } })
        .then((res) => {
          console.log(res.data)
          getMessages()
        })
        .catch((err) => console.log(err))

    }
    else {
     toast({
      description: "Please type your message",
      position: "top",
      status: "info",
      duration: "3000"
     })
    }

  }

  useEffect(() => {
    if(userId && params.receiverId){
      axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${params.receiverId}`,
      { headers: { "Authorization": `${token}` } })
      .then((res) => {
        console.log(res.data)
        setUser(res.data)
        getMessages()
      })
      .catch((err) => console.log)
    }
    else{
      navigate("/dashboard")
    }
  }, [])
  return (
    <>
      <SideBar
        children={
          <Box
            display="flex"
            flexDirection="column"
            alignItems="stretch"
            width={{ base: "100%", sm: "100%", md: "100%", lg: "50%", xl: "50%" }}
            minHeight="90vh"
            bg="white.100"
            p={4}
            borderRadius="md"
            boxShadow="md"
            mt={{ base: "20", sm: "20", md: "10", lg: "10", xl: "10" }}
            position="relative"
          >
            {/* Header */}
            <Flex borderRadius={'8px'} onClick={() => navigate(`/users-profile/${params.receiverId}`)} gap='2' p='2' align="center" width="100%" boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} cursor={'pointer'}>
              <Avatar src={user && user.profile_pic} size="sm" />
              <Text fontWeight="bold">{user && user.firstname + " " + user.surename}</Text>
              {/* <Avatar src={messages && messages[0]?.profile_pic} size="sm" /> */}
            </Flex>

            {/* Chat messages */}
            <VStack width="100%" mt='3' align="flex-start" spacing={2} overflowY="auto" flex="1" pb={16} p='2' boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
              {messages && messages.map((message) => (
                <Flex key={message.id} justify={message.senderId == userId ? 'flex-end' : 'flex-start'} width="100%">
                  {message.senderId !== userId && (
                    <Avatar src={getCookies('user-profile')} size="sm" display={{ base: 'none', md: 'inline' }} />
                  )}
                  <Box className='box'
                    bg={message.senderId === userId ? 'white' : 'blue.500'}
                    color={message.senderId === userId ? 'gray.800' : 'white'}
                    p={2}
                    borderRadius="md"
                    boxShadow="md"
                    maxWidth="80%"
                  >
                    <Text>{message.message}</Text>
                  </Box>
                  {message.senderId === userId && (
                    <Avatar src={user.profile_pic} size="sm" display={{ base: 'none', md: 'inline' }} />
                  )}
                </Flex>
              ))}
            </VStack>

            {/* Message input */}
            <Box position="sticky" bottom={0} width="100%" p={4} backdropFilter="blur(8px)"
            >
              <Flex align="center">
                <Input placeholder="Type a message" flex="1" mr={2} value={text} onChange={handleInputChange} />
                <Button colorScheme="blue" onClick={() => handleSendMessages()}>Send</Button>
              </Flex>
            </Box>
          </Box>
        }
      />
    </>
  )
}

export default Messages;