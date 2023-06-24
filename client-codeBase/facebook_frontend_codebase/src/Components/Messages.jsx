import { Box, VStack, Avatar, Text, Input, Button, Flex, Toast, useToast, Image } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from "react";
import SideBar from './SideBar';
import { getCookies } from '../utils/getData';
import axios from 'axios';
import "./message.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Follow from './Follow';

const Messages = ({ senderId, receiverId }) => {

  const [text, setText] = useState('')
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const boxRef = useRef(null);
  const inputRef = useRef(null);
  const userId = getCookies("userId")
  const token = getCookies("fb_token")
  const params = useParams()
  const toast = useToast()
  const navigate = useNavigate()
  const theme = localStorage.getItem('chakra-ui-color-mode')

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
          setText("")
          getMessages()
          setTimeout(() => {
            scrollToBottom()
          }, 2000)
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessages();
    }
  };

  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    if(userId && params.receiverId){
      axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${params.receiverId}`,
      { headers: { "Authorization": `${token}` } })
      .then((res) => {
        inputRef.current.focus();
        console.log(res.data)
        setUser(res.data)
        getMessages()
        scrollToBottom()
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
            <Flex position={'sticky'} onClick={() => navigate(`/users-profile/${params.receiverId}`)} gap='2' p='2' align="center" width="100%" boxShadow={'rgba(0, 0, 0, 0.16) 0px 2px 6px'} cursor={'pointer'}>
              <Avatar src={user && user.profile_pic} size="sm" />
              <Text fontWeight="bold">{user && user.firstname + " " + user.surename}</Text>
              
              {/* <Avatar src={messages && messages[0]?.profile_pic} size="sm" /> */}
            </Flex>

            {/* Chat messages */}
            <VStack
             ref={boxRef}
            width="100%" align="flex-start" spacing={2} overflowY="auto" flex="1" pb={16}
            p='2' boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'}>
              {messages.length > 1 ?   
              
              messages && messages.map((message) => (
                <Flex key={message.id} justify={message.senderId == userId ? 'flex-end' : 'flex-start'} width="100%" gap={'1'}>
                  {message.senderId !== userId && (
                    <Avatar
                    cursor={'pointer'} 
                    onClick={() => navigate(`/users-profile/${params.receiverId}`)}
                    src={user.profile_pic} size="sm" display={{ base: 'none', md: 'inline' }} />
                  )}
                  <Box className='box'
                  mt={'5'}
                  borderTopRightRadius={message.senderId !== userId ? "20px" : "0px"}
                  borderBottomRightRadius={message.senderId !== userId ? "20px" : "20px"}
                  borderBottomLeftRadius={message.senderId !== userId ? "20px" : "20px"}
                  borderTopLeftRadius={message.senderId === userId ? "20px" : "0px"}
                    bg={ message.senderId === userId ? theme == "dark" ? 'grey' : "white" : 'blue.500'}
                    color={message.senderId === userId ? theme == "dark" ? "white" : 'gray.800' : 'white'}
                    p={2.5}
                    // borderRadius="md"
                    boxShadow="md"
                    maxWidth="90%"
                  >
                    <Text>{message.message}</Text>
                  </Box>
                  {message.senderId === userId && (
                    <Avatar  
                    cursor={'pointer'}
                    onClick={() => navigate(`/users-profile/${userId}`)}
                    src={getCookies('user-profile')}
                     size="sm"
                      display={{ base: 'none', md: 'inline' }}
                       />
                  )}
                </Flex>
              ))
             
            : <Image onClick={() => navigate("/users")}
             cursor={'pointer'}
            src="https://img.freepik.com/premium-vector/no-message-found_637684-6.jpg?w=2000"
             alt="No messages yet"
             borderRadius={'8px'}
             />}
            </VStack>

            {/* Message input */}
            <Box position="sticky" bottom={0} width="100%" p={4} backdropFilter="blur(8px)"
            >
              <Flex align="center">
                <Input 
                 ref={inputRef}
                 placeholder="Type a message"
                 flex="1"
                 mr={2}
                 value={text}
                 onKeyDown={handleKeyDown}
                 onChange={handleInputChange} />
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