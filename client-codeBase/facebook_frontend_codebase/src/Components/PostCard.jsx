import React, { useState } from "react";
import { Box, Text, Button, Image } from "@chakra-ui/react"
import "./Post.css"; // CSS file for styling
// import "./ImageInput.css";
const PostCard = ({
    user_profile,
    user_name,
    time,
    post_text,
    post_image,
    PostId
}) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(URL.createObjectURL(file));
    };
    return (
        <Box className="post">
            <Box className="post-header">
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
            <Box className="post-actions">
                <Button className="post-like">Like : {PostId}</Button>
                <Button className="post-comment">Comment</Button>
                <Button className="post-share">Share</Button>
            </Box>
        </Box>
    );
};

export default PostCard;
