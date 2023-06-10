import axios from "axios"
import { Box, Center, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { getCookies } from "../utils/getData";
import { useNavigate } from "react-router-dom"
import PostCard from "../Components/PostCard";
import Loading from "../Components/Loading"

const Posts = () => {

    const [postData, setPostData] = useState(null)
    const navigate = useNavigate()
    const userId = getCookies('userId')
    const token = getCookies('fb_token')
    const theme = localStorage.getItem('chakra-ui-color-mode')
    useEffect(() => {
        if (userId && token) {
            axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/post/get`, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    console.log(res.data)
                    setPostData(res.data)
                })
                .catch((err) => {
                    navigate("/login")
                })
        }
        else {
            navigate("/login")
        }
    }, [])

    const boxStyle = {
        border: theme === "light" ? "1px solid white" : "1px solid black"
      };
    return postData ?
        (
            <Box
                // width={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" }}
                // ml={{ base: "", sm: "0", md: "0", lg: "0", xl: "0" }} 
                // style={boxStyle}
                borderRadius="8px"
                >
                {postData && postData.map((el, i) => <Box key={i}>
                    <PostCard
                        user_profile={el.user.profile_pic}
                        user_name={el.user.firstname + el.user.surename}
                        time={el.date}
                        post_text={el.text}
                        post_image={el.images}
                        PostId={el._id}
                        userId={el.user._id}
                    />
                </Box>)}
            </Box>
        ) : (<Loading />)
}
export default Posts