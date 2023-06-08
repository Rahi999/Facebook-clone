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
    return postData ? 
    (
        <Box width={{ base: "140%", sm: "100%", md: "100%", lg: "100%", xl: "100%" }} ml={{ base: "-20", sm: "0", md: "0", lg: "0", xl: "0" }} >
            {postData && postData.map((el, i) => <Box key={i}>
                <PostCard
                 user_profile={el.user.profile_pic}
                 user_name={el.user.firstname+el.user.surename}
                 time={el.date}
                 post_text={el.text}
                 post_image={el.images}
                 PostId={el._id}
                 userId={el.user._id}
                />
            </Box>)}
            
            <PostCard
                user_profile="https://images.unsplash.com/photo-1682687219800-bba120d709c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                user_name="Rahim Ansari"
                time="2 hours ago"
                post_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                post_image="https://plus.unsplash.com/premium_photo-1674939148088-d71acc1541ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                PostId="1"
            />

            <PostCard
                user_profile="https://images.unsplash.com/photo-1682687219800-bba120d709c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                user_name="Rahim Ansari"
                time="2 hours ago"
                post_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                post_image="https://plus.unsplash.com/premium_photo-1674939148088-d71acc1541ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                PostId="1"
            />
        </Box>
    ) : (<Loading />)
}
export default Posts