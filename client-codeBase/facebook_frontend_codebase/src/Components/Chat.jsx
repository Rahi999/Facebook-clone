import React from "react";
import { Box, VStack, Avatar, Text } from '@chakra-ui/react';
import ChatLists from "./ChatLists";

const Chat = () => {

    const users = [
        { id: "1", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" },
        { id: "2", firstname: "Name", surename: "lastname", profile_pic: "demo_img.png" }
    ]
    return (<>
        <Box>
            <ChatLists users={users} />
           
        </Box>
    </>)
}
export default Chat