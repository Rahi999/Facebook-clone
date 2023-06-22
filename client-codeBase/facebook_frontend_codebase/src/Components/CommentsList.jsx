import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { getCookies } from "../utils/getData";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

const CommentsList = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false)
    const token = getCookies("fb_token")
    const navigate = useNavigate()

    const getPost = () => {
        setLoading(true)
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/post/get/${postId}`, { headers: { "Authorization": `${token}` } })
            .then((res) => {
                console.log(res.data)
                setPost(res.data)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                navigate("/dashboard")
            })
    }

    useEffect(() => {
        getPost()
    }, [])

    return loading ? (<Loading />) : (<>
        <Box mt="20" pr={{base: "0", sm: "0", md: "30", lg: "80", xl: "80"}} >
            {post && <PostCard
                        user_profile={post.user.profile_pic}
                        user_name={post.user.firstname + post.user.surename}
                        time={post.date}
                        post_text={post.text}
                        post_image={post.images}
                        PostId={post._id}
                        userId={post.user._id}
                    />}
        </Box>
    </>)
}
export default CommentsList