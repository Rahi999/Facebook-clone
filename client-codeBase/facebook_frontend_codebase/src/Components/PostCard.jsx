import React, { useState } from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import LikeButton from "./LikeButton";
// import "./ImageInput.css";
const PostCard = ({
    user_profile,
    user_name,
    time,
    post_text,
    post_image,
    PostId,
    userId
}) => {

    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };
    return (
        <Box className="post" 
        >
            <Box className="post-header" onClick={() => navigate(`/user-profile/${userId}`)} cursor="pointer">
                <Box className="image-input">
                    <Image
                        className="post-avatar"
                        src={user_profile}
                        alt="User Avatar"
                    />
                </Box>
                <Box className="post-info">
                    <h3 className="post-user">{user_name}</h3>
                    <Text className="post-timestamp">{time}</Text>
                </Box>
            </Box>
            <Box className="post-content">
                <Text className="post-text">{post_text}</Text>
                <Image className="post-image" src={post_image} alt="" />
            </Box>
            {/* <Box className="post-actions"> */}
                <LikeButton postId={PostId} />
                <Box mt="-10" width="70%" display="flex" textAlign="right" ml="30%" gap="3">
                <Button width={{base: "70%", sm: "70%", md: "70%", lg: "70%", xl: "30%"}} fontSize={{base: "12px", sm: "14px", md: "", lg: "", xl: ""}} className="post-comment">Comment</Button>
                <Button width={{base: "70%", sm: "70%", md: "70%", lg: "70%", xl: "30%"}} fontSize={{base: "12px", sm: "14px", md: "", lg: "", xl: ""}} className="post-share">Share</Button>
                </Box>
            {/* </Box> */}
        </Box>
    );
};

export default PostCard;
