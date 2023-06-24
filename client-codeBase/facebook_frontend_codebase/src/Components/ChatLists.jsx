import React from "react";
import {Link, useParams} from "react-router-dom"
import axios from "axios"
import { Box, VStack, Avatar, Text, IconButton } from '@chakra-ui/react';
import { BiCommentDetail } from "react-icons/bi";
import Follow from "./Follow";

const ChatLists = ({users}) => {
    const params = useParams()
    // const senderId = params.serderId;
    // const receiverId = params.receiverId;

    const senderId = "6495c422e94b5545318eb3eb";
    const receiverId = "6495c422e94b5545318eb3ec";
    
    return (<>
        <Box>
            <VStack align="start" spacing={4}>
                {users.map((user) => (
                    <Link to={`/messages/${senderId}/${receiverId}`} key={user.id}>
                    <Box  display="flex" alignItems="center">
                        <Avatar src={user.profile_pic} />
                        <Text ml={2}>{`${user.firstname} ${user.surename}`}</Text>
                       
                       <IconButton
                            aria-label="Comment"
                            icon={<BiCommentDetail />}
                        />
                    </Box>
                    </Link>
                ))}
            </VStack>
        </Box>
    </>)
}
export default ChatLists