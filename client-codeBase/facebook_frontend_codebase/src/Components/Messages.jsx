import { Box, VStack, Avatar, Text, Input, Button, Flex, Toast, useToast, Image, useUpdateEffect, IconButton } from '@chakra-ui/react';
import React, { useCallback, useEffect, useRef, useState } from "react";
import SideBar from './SideBar';
import { getCookies } from '../utils/getData';
import axios from 'axios';
import "./message.css"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Follow from './Follow';
import { MdDelete } from 'react-icons/md';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { FiMoreVertical } from 'react-icons/fi';

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
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

  const handleInputChange = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const getMessages = () => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/chat/get-messages/${userId}/${params.receiverId}`,
      { headers: { "Authorization": `${token}` } })
      .then((res) => {
        setMessages(res.data)
        console.log(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleSendMessages = () => {
    if (text) {
      const payload = {
        senderId: userId,
        receiverId: params.receiverId,
        time: formattedDateTime,
        message: text
      };
      console.log("Payload:", payload); // Log the payload before sending the request
      console.log("Formatted DateTime:", formattedDateTime); // Log the value of formattedDateTime

      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/chat/send-messages`, payload, {
        headers: { "Authorization": `${token}` }
      })
        .then((res) => {
          console.log(res.data);
          setText("");
          getMessages();
          setTimeout(() => {
            scrollToBottom();
          }, 2000);
        })
        .catch((err) => console.log(err));

    } else {
      toast({
        description: "Please type your message",
        position: "top",
        status: "info",
        duration: "3000"
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessages();
      scrollToBottom()
    }
  };

  const scrollToBottom = () => {
    if (boxRef.current) {
      boxRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    if (loading) {
      scrollToBottom()
    }
    if (userId && params.receiverId) {
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
    else {
      navigate("/dashboard")
    }
  }, [])

  const handleDelete = () => {
     axios.delete(`${process.env.REACT_APP_DEV_BASE_URL}/chat/delete-messages/${userId}/${params.receiverId}`,
     {headers: { "Authorization": `${token}` } }
     )
     .then((res) => {
      toast({
        description: res.data.message,
        position: "top",
        status: "success",
        duration: "3000"
      })
      getMessages()
     })
     .catch((err) => {
      toast({
        description: err.response.data.message,
        position: "top",
        status: "error",
        duration: "3000"
      });
     })

  }
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
              <Box>
              </Box>
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
                      bg={message.senderId === userId ? theme == "dark" ? 'grey' : "blue.500" : 'white'}
                      color={message.senderId === userId ? theme == "dark" ? "white" : 'gray.800' : 'black'}
                      p={2.5}
                      // borderRadius="md"
                      boxShadow="md"
                      maxWidth="90%"
                    >
                      <Text>{message.message}</Text>
                      <Text textAlign={message.senderId === userId ? "left" : "right"} fontSize={'9px'}>{message.time && message.time}</Text>
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

                : 
                <Box m={'auto'} onClick={() => navigate("/users")} cursor={'pointer'}>
                  <Image 
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDg8PDg0PEBAVEBAQEA8OEBANEA0PFxEWFhgWFhUYHSogGBslGxYXITEiJjUrLi4uGB82ODMsNygtLisBCgoKDg0OFxAQFy0gICUrLS0tKy0tLSstLisrLS0tLy0tLS0tLS0rMC8rKy0rLSsrLS0tKy8tLS8tLSsrKystLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQIDBgcFBAj/xABCEAACAQIBCAYHBQYGAwAAAAAAAQIDEQQFBhIhMUFRYRMicYGRoQcUIzJCUmIzcrGywXOCotHS8TRTY5LC4RVDRP/EABsBAAIDAQEBAAAAAAAAAAAAAAAEAgMFAQYH/8QANhEAAgIAAwQJAwIFBQAAAAAAAAECAwQREgUhMUETUWFxgZGhwdEisfAy4RQjNEJyFTNigvH/2gAMAwEAAhEDEQA/AO4gAAAAAAAAAA+bGYylQg51ZxhFb5O3cuL5GoZWz32xwtPV/mVV+WH8/A7kxnD4S295QXjy8zc61WFOLlOUYRW2UmopdrZ4WNzswVK6jOVV6/stcf8Ac7Lwuc/xmPrV5aVarKb3aUrpdi2LuMFzrizbo2LWt9ss+xbl8v0NtxOfFaX2VGnFcajc3+iPLr5yY6ptryXKFqXmlc8W5NypxZp14PDQ/TWvLP77z7p5TxMvexFaX3qs3+LMDqN7W32tsw3LXK3AY0pcDLGbWxtdjsfTSyjXj7tetH7tSa/BnwplkytwOOCfFHrUM4MbDZiJv79qn5kz1MNnliI/aU6c1yvTk+/WvI1ZMumRzlHgxazB0T/VBeXut5v2Dzsws9U1Om/qWlHxjr8j3MPXp1I3pzjOPGDUl5HJkzLhsTUpy0qc5Qlxi3F+R1YiS4rMzrtjVPfW3F+a+fVnWgaVk3O6pG0cRHTXzwsprtWx+RtWCx9HER0qU1Jb1sce1bUMQtjPgYuIwdtH61u61w/O8+sAFgqAAAAAAAAAAAAAAAAANbzgzppYS9OnarW2ON+pTf1Nb+S8jyM6c7feo4SfKVeL28VTf/Lw4mk3Ga8O3vkbOD2bnlO7y+fjmfblDKNbEz06tRyluvqjFcIrYkfLcrcXGOjN6LSWSWSRe5NzHcXIuslqMlxcpcXIOs7qMtybmK5NyqVZJSMlyblLk3KpVk1IyJkplEwmUygSMqZZMxpkplEoEcjKmZ8NialKSnTm4SWzRdv7rkfKmWTKJQ6iLjmsmbzkPOeFW1Ou1CexTWqE3z+V+XZsNnOQpmyZvZxyo2pV25U9kZbZU/5x/DyL6r2t0vMwMbspZOdC/wCvx8eXUb0CkJqSTi000mmndNPemXGzBAAAAAAAAAABoGeec93LC0Jatcas4v3uMIvhxfdxv6Oe+X/VafQUpWrTj1pLbSpvVf7z1pd74HNmzRwmF1LpJLu+TW2fhU8rZ+C9/gtcXKXFzQ6M2dRe5NzHcXOdGd1GS5a5iuTci6zuoyXJuYrk3K3WS1GW4uY7lrlcqySkXuWuYrlkymVZPUZEyyZiTLJlEqyakZUyUzEmWTF5VlikZEy6ZiTLJi8oEjKmWTMSZZMXlAhkbLmxl50GqVV+yb1N/wDpb3/d4+PE3xO5yFM3HNDLN7Yaq9aXspPevk/l/Ysosy+l+Bg7UwGad0Fv5r3+TbgANnnwAAAHw5Xx8MJQqV57Iq6W+ct0Vzbsj7jmvpIyv0lWOFg+pTtKpbfVa1Lui/4nwGMLR09qhy4vu/Nxfh6ulsUeXPuNWx+MqYirOtVd5Sk5Se7klySsl2GC5juTc9OqstyPQ6suBe4uUuLnejDUXuLmO5Nw6MNRkuLmO5NyDrJKRe5NzHctcrlWdUi9yUylxcqlWTUjMmEzGmWTKZVk1IyJkplEwmLyrLFIypkpmNMsmLyrLFIyJl0zEmXTFpVlkZGRMlMxpl0xaUCfEyJmSnUcWpRbTTTTW1Na0zAmXTFZQONHT8hZRWKoRqatJdWolumv0e3vPTOd5oZS6HEqEn1KloPgp/C/HV3nRBqqWqO88dtDDdBc0uD3r48AACwRPkyli44ejUrT92EJTa42Wxc3sOH4nETqznUk7znKU5PjJu7Okek3H9HhIUU9dWpdrjTh1n/E4HL7nptjYbKl2P8Aufov3z8jUwMdMHLr+y/ctcm5S5Js6BzUWuLlQGgNRNyblLi5zow1F7k3KXJuRdZ3UXuLlLk6+BW6iakXuWuY7k3KZVk1IyJkplEyUymVZNSMiZdMwplkxeVZZGRlTLJmJMsmLSrLVIyJl0zHc2XIWaVbEx6SpLoab1x0o3nJcVHVZc34ClkVFZsJ3wqjqm8ka+mXTPUzgyBUwLi9JTpyuoyS0estzW5nkJisoprNF1N0bIqUHmmZUyyZjTLpis4F5ljI6fkPG+s4enUfvW0Z/fWp/wA+85YmbnmDi/tqDfCrFfwy/wCJXX9Mu8ytsUa6NXOO/wAHufs/A3IADB5Q5T6TMV0mNjTvqp0oq3CUryfk4mpnq52Vukx+Lf8ArTh3QegvynlHu8JX0dEIdSXnz9TVreUIrsAIJLzusAgkA1gEADusFqFKdSUYQi5Tk1GMY63KT2JFTofo2yDZPG1Y63eNFPctkp9+xcr8RbF4mOHqdkvBdb5I5O5QjqPrzfzDoUoxni/a1HZ6F/ZU+Wr3326uRsqyNg0rep4a3DoKdvwPQB4+3F32y1Sm/bwX52mZO2c3m2afl7MbDV4uWGSoVNyV+hnycfh7Y+DOc5QyfWwtR0q1Nwktz2SXGL2Nczux5uV8kYfG0+jrw0lrcZLVOnLjF7vwe+45hNqTqem3OUfVfPc/AZoxcobpb16nEkyUz2s5c2MRgJaX2lBu0asVqXBTXwvyfkeGmehi4WRUoPNM1oWKSzTMiZKZjTLJlU4FykZEzPh6U6k4wpxlOUnaMYq7bPpyLkavjamhSjqVtOcrqFNc3x5bTp+Qs36GBhaC06jXXqyS0pcl8seS8zLxV8Kd3F9Xz+ZlN+MjSut9Xz+Znk5t5nwoaNTEqM6upxp+9Cm+fzS8lz2m4A8vODKkcHh51ZWcvdpxfx1HsXZvfJMxZSlZLfvZiTstxFiz3t7kvj8795q/pCypGTp4WOtp9JN/LLRajHwbfejTUxVrSqTlOcnJyblKT2uTd2yqY70WmOR6rC1KitQXL78/UyJmRMwpl0xayA5FmVM9nNPE9FjKT3Sbpvnpal52PETM2DrdHUpzXwyjPwaf6Cc45BbX0kJQ60157jsQI0lxQLTwW84LlCpp16svmq1JeM2zASyD6Ctw9qABJ0jrIBIANZABZJvUk29iS1tvgkAaz1M2cjSx2JhTV1BderJfDTT16+L2Lt5HZ6NGNOMYQioxilGMVqUYpWSR4uZ+RFgMMlJLpZ2nWe2ztqjfhFau273nvnjtp4v+Ityi/pjuXu/Hl2C9k3J9gABnFYAAAYqtKM4uMoqUWmpRklJST2pp7Tn2dWYzjpVsEnJa3KhtlH9nxX07eF9h0YDOGxVmHnqg+9cn+dayaLKrZVvOJ+f9avdWtqd9VmbVmtmjVxejVraVKhtXw1Kq+lP4fqfdxOkVMl4Wc+knhqEqnzypU5Tv95q59xo4jbGuGVUdL63vy7vn0G54+TjlFZdp8uCwdLD0406UIwitijq73xfNn1AGM2282Icd7BybO7LfrmIag/Y07wp8JcZ99vBI2jP7LnQUvVqcvaVV12tsKOx98ta7L8jm6ZqYLDfT0svD59vM2Nm0ZfzZeHu/bzMyZKZiTLpl84m1GRkTLpmNMsmJ2RLoyMqZZGNMumJTiXxkbp/536gah0kgUZCP8BWeNiIaNSceE5R8JNGM9HOGjoY3FR4V6tuxzbXk0ecfQ4POKfYeRcwCQSI6yASADWQbp6Ocg9LU9bqx9nTdqSfx1vm7I/i+RrGSMnVMZXp0Ke2T1y2qEF70n2L9DtOT8HTw1KFGmrQhFRjx7Xxbet9pkbWxnRV9HH9UvRfvw8zurM+sAHlSIIuaJnTnwoaVHBNSlslX1ShDlDdJ89nbu5/LE1XPpHUm6l79I5Sc78dLbc18Lsey2Oqb0dSyzflmsvv2ElHM74Dnua2fNtGjjpco4i1rcqn9XjvZv8JqSTi000mmndNPemI4nC2YeWma7nyf55nGmi4AFjgAAAD4sq4+nhKFSvN9WCvbfKWxRXNuyPtOWekDL3rFb1enL2VOTTa2TrbG+yOtdulyG8FhXiLVHlxb7P34evBF1FXSTS5czXso46pia1SrVd5SlpPhFborklZdxgTMaZZM9NOCSyR6CDy3IyJl0zGmWTE7Il8ZGZMlMxpl0xKyJfFmRMumYkzLTi5SjFbW0l2vUJ2RL4s9/wD8S+BB0T1Gl8qAlmec/wBVkct9IWF6PKFR21VIU6i/26D84M1o6H6UsFeGHxCXuylSl2SWlH8svE56e12db0mGg+pZeW4wpSyZAJA6V6yAiTY8xsjLGYrSqK9Klo1Jp/HJvqR7Lpt9lt5VddGmDslwX568AUs3kjcMwsheq0OmqRtWqpOz206W2MeTe19y3G2A8POHOTD4CHXelVavCjF9Z85P4Y8/C54ucrcVc2lnKXL85JfIxuSPRx+Oo4anKrWqKEFtb3vgltb5I5jnRnfWxmlSpXpYfZo7J1V9bW76V33PIy1lnEY2p0lad7X0IR1QprhFfrtZ556PAbLhRlOzfL0Xd1vt8ushrzBBINYnGRBsGbOdVfANQd6tC+um3rhxcHufLY+W018ELaoWxcJrNFyafE7lkrKlDGU1VoVFKOxrZKEuEluZ95wnJmUq+EqKrQqOEtj3xmuElvR07N7PHC4uKjVlGhW2OM2lCb4wk9Xc9fbtPLY3Zc6c5V/VH1Xf2dq8SLjlwNoBWLT1rxPFy3nNhMFF6dRTqbqNNqU2+fyrm/Mza652S0wWb7CKTe5HyZ7Ze9Rw7jTlatUvGFttOPxT7r2XNrgzklz7ctZUq42vKtVet6oxXu04LZFctfi2fCex2fg1hqdHN7339Xh8vmauHh0ccufMsmXTMSZdMvsiOxZkTLpmJGRMRsiXRZdMumY0yyYnZEvizKmetmzQ6TG4eH+pCb7Idd/lPIRt/o6wunXqVmtUKbivvSf8ovxM+5ZRbOYi3o6Zy7PvuXqzoYAM48geXnHk71rCVqKXWcLw/aR60fNJd5xWx345Hn3kv1bGSlFWp1r1Y8FK/XXi79kkb2xL8nKl8969/Tf4MXvWS1GuAkHohTUQe5mpl95PrSk4OdKaUakY2UtTupRvvV3q5niArtqjbBwms0wVjTzRv+WfSDHo9HB05qb21KyilT7Ipu77dXaaFWqzqSlOcnOcneUpPSlJ82VBVh8JVh1lWsvu/Em7XLiQCSBk7GRAJB0tjIggkkC+MioAOjEZE6bSsm0uCbSKskgM2MRkAAAzGRBKZBKOSWaGIsujIjEiyE7Il8WZEXRRFkI2RL4mRM6pmXgOgwcG1aVRutL95LR/hS8Wc9zbyc8XiqdK3VvpVOVOL1+Opd6OwRSWpalw4GPjJZZRXeZu1bvpjUu9+3z5FgAIGKDws7Mj+u4WUI26WPtKT2ddL3exq68HuPdBOqyVc4zjxTzOSipLJnAmmm0001qaepp8GiTdfSFkDo5vGUY9ST9sl8FR7J9j38+00o9th8RG+tWR5+j6jGtTrk4sAAuKtZUFgdJqZUFioFkZAgkAXRkQQSDpfGQKkgBmEiCCQdGYsgAAMxkCCSDozBkouiiLIXsiMxZlRdMxI2jMjIPrdXpakfYQabvsqVNqh2b33LeZ2IlGuLlIslZGuLlLgja8xcj+rYfpZxtUq2lZ7YU/hXJu932rgbUAeYsm5ycnzPO22OybnLmAAQKwAAAxVqUakZQnFSjJOMotXUotWaZyXOzN6eAq9W8qE2+jnt0PplzXmu+3Xz5sdg6WIpypVYKUGrNP8U9z5juBxksNPPjF8V7969RfEUK2PU1wZwwk9rObN2rgJp3c6Mm1Tqb+OjLhK3j4peKevrsjZFTg80zBnqg3GW5kAkEwUyAABbGRUFip0vjIEEkAMxkQCSDo1FkAkgBqDIBJB0ZgwAAGoMhFkVPVzeyFXx9XRpq0VbpKjXUpr9XwX9yq6UYRcpPJIYUlFZvcjJm9kapjqypw1QVnOpa6pw/Vvcv+zr+T8FTw9KFKlHRhFWS3vi297b13MWR8l0cFSjSoqyWuUnrlUlvlJ72egePxuMeIlu3RXBe/x1d+Zl4nEu17uC/M/jqAAEhUAAAAAAAAAA8HPShGeT8QnujGS5NTT/67zkR2bOeN8Biv2Un4azjJ6bYj/kSX/L2RgbWeVsX2e4BJBsmdGQIJADEZEAABmLKgA6MwZBBJB0bgSVJIAagCCSDo1EA9PI+b+Lxr9jSbjfXVn1KUf3t/Yrs6FkDMnDYW061sRVWtaS9lTf0w3vm/ISxW0KcOvqeb6lx8er84l7tjDiajmxmbXxmjUraVKhtu1o1Kq+hPYvqfdc6fk/AUcLTjSo01CEdiW98W9rfNn2A8tjMdZiX9W5Lgl+b32ilt0rOPDqAAEyoAAAAAAAAAAAAAPPy8r4PE/sKv5GcVO54qhGrTnTl7soSg7cJRaf4nF8qZOq4SrKnVi009T+GUd0ovemeh2JZHROHPPPwPP7bi8658t68T5AZsHhKteWhRpzqS+WMXJrt4LmzbskZg1ZWli6ipr/Lp2nPvlsXma12KqpWdkkuzn5Gfh6Lbv0LPt5efsaVGLbSSbbdkkrtvglvPdw+Z+UasdJYfRW5TnCnJ/ut3XfY6XkvImFwatQoxi7Wc31py7ZPX3bD0zFu2288qo7ut8fJPd5s26dmJL+ZLwXz/AOHE8bkLG0PtcLUit8lFziv3o3R5x30+XE4GhW+1oUqn7SnGf4olXtzL9dfk/nP7lrwGX6ZeaOFg7JWzVybPbhKa+5pU/wArR88syclv/wCeS7K1b+oZW28PzjLyXydWFmuaORA64sycmf5En21q39Rmp5pZNhswkH9+VSp+Zs69t4ZLcpeS+S+NUlxOOM+3B5IxeI+xw1Wa4xhLR/3PUdmw+S8LS+zw1GD4wpQg/FI+0Xs26v7K/N+yXuXRWRy3Aej7GVLOtOnRjwv0s13R1eZteSsycDh7SnB158a1nFPlBavG5s4M2/aeJt3atK6lu9ePqT1MrGCikkkktSS1JIsAIHAAAAAAAAAAAAAAAAAAAAAav6QP8H+8SBrBf1FfeL4v+ns/xZbMH/Br7zNlAOYz+os7zuF/2K/8UAALF4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k="
                  alt="No messages yet"
                  borderRadius={'50px'}
                  width={'30%'}
                  m={'auto'}
                />
                <Text>No messages yet</Text>
                </Box>
                }
            </VStack>

            {/* Message input */}
            <Box position="sticky" bottom={0} width="100%" p={4} backdropFilter="blur(8px)"
            >
              <Flex gap='1'>
              <Box>
              <Menu>
      <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" />
      <MenuList>
        <MenuItem onClick={()=> handleDelete()}>Delete All messages</MenuItem>
      </MenuList>
    </Menu>
              </Box>
                <Input
                  ref={inputRef}
                  placeholder="Type a message"
                  flex="1"
                  mr={2}
                  value={text}
                  onKeyDown={handleKeyDown}
                  onChange={handleInputChange} />
                {/* <Button colorScheme="blue" >Send</Button> */}
                <IconButton
                textAlign={'center'}
                onClick={() => handleSendMessages()}
                  colorScheme="blue"
                  size="md"
                  rightIcon={<RiSendPlaneFill />}
                />
                
              </Flex>
            </Box>
          </Box>
        }
      />
    </>
  )
}

export default Messages;