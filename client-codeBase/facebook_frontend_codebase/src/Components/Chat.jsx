import React, { useEffect, useState } from "react";
import { Box, VStack, Avatar, Text } from '@chakra-ui/react';
import ChatLists from "./ChatLists";
import axios from "axios";
import { getCookies } from "../utils/getData";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import ChatList from "./ChatList";

const Chat = () => {

    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(null)
    const token = getCookies("fb_token")
    const userId = getCookies("userId")
    const navigate = useNavigate()

    useEffect(() => {
        if(token){
            setLoading(true);
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${userId}`, { headers: { "Authorization": `${token}` } })
        .then((res) => {
            setUsers(res.data.followers.reverse())
            setFollowing(res.data.following.reverse())
            console.log(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
            setLoading(false)
        })
        }
        else{
            navigate("/login")
        }
    }, [])
    console.log(users, following)

    // const users = [
    //     { id: "1", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" },
    //     { id: "2", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" }
    // ]
    return loading ? (<Loading />):  (<>
        <Box>
            {users && <ChatList users={users} />}
            { following && <ChatList users={following} />}
        </Box>
    </>) 
}
export default Chat