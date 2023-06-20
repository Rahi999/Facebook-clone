import React, { useState } from "react";
import { Box, Text, Button, Image, Tooltip, AvatarGroup, Drawer, Divider, Flex } from "@chakra-ui/react"
import { IconButton } from '@chakra-ui/react';
import { BiCommentDetail } from 'react-icons/bi';
import { AiOutlineDislike } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import "./Post.css";
import LikeButton from "./Like";
import CreatePost from "./CreatePost";
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
                <Text className="post-text" fontSize={{base: "14px", sm:"14px", md: "26px", lg:"27px", xl: "28px"}} maxW={'100%'}>{post_text}</Text>
                <Image className="post-image" src={post_image} alt="" />
            </Box>
            
            {/* <Box className="post-actions"> */}
            
            <LikeButton postId={PostId} />
            <Box mt="-10" width={{ base: "40%", sm: "40%", md: "40%", lg: "27%", xl: "27%" }} display="flex" textAlign="right" ml={{ base: "30%", sm: "30%", md: "30%", lg: "20%", xl: '20%' }} justifyContent={'space-between'}>
                {/* <Button width={{ base: "70%", sm: "70%", md: "70%", lg: "70%", xl: "30%" }} fontSize={{ base: "12px", sm: "14px", md: "", lg: "", xl: "" }} className="post-share">Share</Button> */}
                <Tooltip label="Dislike">
        <IconButton
          aria-label="Dislike"
          icon={<AiOutlineDislike />}
        //   colorScheme="blue"
          ml={4}
        />
      </Tooltip>
                {/* <Button width={{ base: "70%", sm: "70%", md: "70%", lg: "70%", xl: "30%" }} fontSize={{ base: "12px", sm: "14px", md: "", lg: "", xl: "" }} className="post-comment">Comment</Button> */}
                <Tooltip label="Comment">
        <IconButton
          aria-label="Comment"
          icon={<BiCommentDetail />}
        //   colorScheme="blue"
          ml={4}
        />
      </Tooltip>
            </Box>
            {/* </Box> */}
        </Box>
    );
};

export default PostCard;
