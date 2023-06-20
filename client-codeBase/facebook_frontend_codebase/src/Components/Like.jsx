import React, { useEffect, useState } from "react";
import axios from 'axios'
import useSound from "use-sound";
import boopSfx from "../Assets/fb_like.mp3";
import { ListItem, UnorderedList, Box, Button, useToast, IconButton, Tooltip, Text, Flex, AvatarGroup, Avatar } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import Theme from "./Theme";
import "./LikeButton.css"
import { getCookies } from "../utils/getData"
import { useNavigate } from "react-router-dom"

const LikeButton = ({ postId }) => {

    const navigate = useNavigate()
    const userId = getCookies("userId")
    const token = getCookies("fb_token")
    const toast = useToast()
    const [play] = useSound(boopSfx);
    const [liked, setLiked] = useState(false);
    const [loading, setLoading] = useState(false)
    const [like, setLike] = useState(null)
    const [dislike, setDisLike] = useState(null)
    const [comment, setComment] = useState(null) 

    useEffect(() => {
        if (!userId) {
            toast({
                title: 'User not found',
                position: "top",
                status: 'error',
                duration: 3000,
            })
            navigate("/dashboard")
        }
    }, [])

    const getPost = () => {
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/post/get/${postId}`, { headers: { "Authorization": `${token}` } })
        .then((res) => {
            setLike(res.data.likes)
            setDisLike(res.data.dislikes)
            setComment(res.data.comments)
            // console.log(res.data)
        })
        .catch((err) => {
            toast({
                title: err.response.data.message,
                position: "top",
                status: 'error',
                duration: 3000,
            })
        })
    }

    useEffect(() => {
     getPost()
    }, [])
    const isLiked = like && like.includes(userId)
    // console.log(isLiked)

    const handleClick = () => {
        if (userId && postId) {
            console.log(userId, postId)
            setLoading(true)
            const payload = { likerId: userId }
            axios.put(`${process.env.REACT_APP_DEV_BASE_URL}/post/like/${postId}`, payload, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    setLoading(false)
                    play();
                    setTimeout(() => {
                        setLiked(true)
                    }, 100)
                    // navigate("/dashboard")
                    getPost()
                })
                .catch((err) => {
                    setLoading(false)
                    toast({
                        title: err.response.data.message,
                        position: "top",
                        status: 'info',
                        duration: 3000,
                    })
                    setTimeout(() => {
                        setLiked(true)
                    }, 100)
                })
        }
    };
    return (<>
        <Box >
        <Flex justifyContent={'space-between'} width={{ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%" }}>
                <Flex gap={'1'}>
                    <Avatar size="xs" src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 16 16'%3e%3cdefs%3e%3clinearGradient id='a' x1='50%25' x2='50%25' y1='0%25' y2='100%25'%3e%3cstop offset='0%25' stop-color='%2318AFFF'/%3e%3cstop offset='100%25' stop-color='%230062DF'/%3e%3c/linearGradient%3e%3cfilter id='c' width='118.8%25' height='118.8%25' x='-9.4%25' y='-9.4%25' filterUnits='objectBoundingBox'%3e%3cfeGaussianBlur in='SourceAlpha' result='shadowBlurInner1' stdDeviation='1'/%3e%3cfeOffset dy='-1' in='shadowBlurInner1' result='shadowOffsetInner1'/%3e%3cfeComposite in='shadowOffsetInner1' in2='SourceAlpha' k2='-1' k3='1' operator='arithmetic' result='shadowInnerInner1'/%3e%3cfeColorMatrix in='shadowInnerInner1' values='0 0 0 0 0 0 0 0 0 0.299356041 0 0 0 0 0.681187726 0 0 0 0.3495684 0'/%3e%3c/filter%3e%3cpath id='b' d='M8 0a8 8 0 00-8 8 8 8 0 1016 0 8 8 0 00-8-8z'/%3e%3c/defs%3e%3cg fill='none'%3e%3cuse fill='url(%23a)' xlink:href='%23b'/%3e%3cuse fill='black' filter='url(%23c)' xlink:href='%23b'/%3e%3cpath fill='white' d='M12.162 7.338c.176.123.338.245.338.674 0 .43-.229.604-.474.725a.73.73 0 01.089.546c-.077.344-.392.611-.672.69.121.194.159.385.015.62-.185.295-.346.407-1.058.407H7.5c-.988 0-1.5-.546-1.5-1V7.665c0-1.23 1.467-2.275 1.467-3.13L7.361 3.47c-.005-.065.008-.224.058-.27.08-.079.301-.2.635-.2.218 0 .363.041.534.123.581.277.732.978.732 1.542 0 .271-.414 1.083-.47 1.364 0 0 .867-.192 1.879-.199 1.061-.006 1.749.19 1.749.842 0 .261-.219.523-.316.666zM3.6 7h.8a.6.6 0 01.6.6v3.8a.6.6 0 01-.6.6h-.8a.6.6 0 01-.6-.6V7.6a.6.6 0 01.6-.6z'/%3e%3c/g%3e%3c/svg%3e" />
                    <Text fontWeight={'medium'} color={'gray.600'} fontSize={{base: "12px", sm: "14px", md: "14px", lg: "16px", xl: "16px"}}>{like && like.length}</Text>
                    </Flex>
                <Text fontWeight={'medium'} color={'gray.600'} fontSize={{base: "12px", sm: "14px", md: "14px", lg: "16px", xl: "16px"}}>{dislike && dislike.length} Dislikes</Text>
                <Text fontWeight={'medium'} color={'gray.600'} fontSize={{base: "12px", sm: "14px", md: "14px", lg: "16px", xl: "16px"}}>{comment && comment.length} Comments</Text>

            </Flex>
            <Box bg="grey" height='2px' borderRadius='50px' mt="10px" ></Box>
            <Box>
                <Box className="react" padding={'1'}>
                    <Box className="react-me">
                        {/* <Button width="28%" fontSize={{ base: "12px", sm: "14px", md: "", lg: "", xl: "" }} className="button"
                        // colorScheme={isLiked || liked ? 'green' : 'blue'}
                        >
                            {isLiked || liked ? 'Liked' : 'Like'}
                            </Button> */}
                        {/* <Tooltip label="Like"> */}
                            <Flex textAlign='left'>
                           <Tooltip label='Like'>
                           <IconButton
                                isDisabled={isLiked || liked}
                                className="button"
                                aria-label="Like"
                                icon={isLiked || liked ? <AiFillLike /> : <AiOutlineLike />}
                                // colorScheme={isLiked || liked ? "blue" : undefined}
                                
                            />
                           </Tooltip>
                            </Flex>
                        {/* </Tooltip> */}

                        <Box className="inner" onClick={handleClick}>

                            <Box className="react-box" >
                                {isLiked || liked ? null : (<UnorderedList  >
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