import React, { useState } from "react";
import useSound from "use-sound";
import boopSfx from "../Assets/fb_like.mp3";
import { ListItem, UnorderedList, Box, Button } from "@chakra-ui/react";
import Theme from "./Theme";
import "./LikeButton.css"
import { getCookies } from "../utils/getData"

const LikeButton = ({ postId }) => {


    const userId = getCookies("userId")
    const [play] = useSound(boopSfx);
    const [liked, setLiked] = useState(false);
    const handleClick = () => {
        play();
        // alert(postId)
        setTimeout(() => {
            setLiked(true)
        }, 100)
    };
    return (<>
        <Box>
            <Box>
                <Box className="react">
                    <Box className="react-me">
                        <Button width="28%" fontSize={{ base: "12px", sm: "14px", md: "", lg: "", xl: "" }} className="button">{liked ? "Liked" : "Like"}</Button>
                        <Box className="inner" onClick={handleClick}>
                            
                                <Box className="react-box" >
                                   {liked ? null: ( <UnorderedList  >
                                        <ListItem className="like" data-hover="like"></ListItem>
                                        <ListItem className="love" data-hover="love"></ListItem>
                                        <ListItem className="haha" data-hover="haha"></ListItem>
                                        <ListItem className="wow" data-hover="wow"></ListItem>
                                        <ListItem className="sad" data-hover="sad"></ListItem>
                                        <ListItem className="angry" data-hover="like"></ListItem>
                                    </UnorderedList>)}
                                </Box>
                            
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>)
}
export default LikeButton