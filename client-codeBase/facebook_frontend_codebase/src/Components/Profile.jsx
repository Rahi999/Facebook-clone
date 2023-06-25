import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Heading,
    Avatar,
    AvatarBadge,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    IconButton,
    Toast,
    useToast
} from '@chakra-ui/react';
import { SmallCloseIcon, EditIcon } from '@chakra-ui/icons';
import { getCookies } from "../utils/getData";
import Loading from "./Loading";
import Follow from "./Follow";
import UnFollow from "./Unfollow";
import SideBar from "./SideBar";

const Profile = () => {

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const params = useParams()
    const userId = params.userId
    const id = getCookies('userId')
    // console.log(userId, id)
    const token = getCookies('fb_token')
    const navigate = useNavigate()

    const getUserprofile = () => {
        if (userId && token) {
            setLoading(true)
            axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${userId}`, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    setUserData(res.data)
                    // console.log(res)
                    setLoading(false)
                    console.log(userData)
                })
                .catch((err) => {
                    setLoading(false)
                    toast({
                        title: "User not found",
                        position: "top",
                        status: 'error',
                        duration: 3000,
                    })
                    navigate("/")
                })
        }
        else {
            navigate("/login")
        }
    }

    useEffect(() => {
       getUserprofile()
    }, [])
    return userData ? (
            <Center py={6} m='auto' w='100%'><Box
        maxW={{base: "100%", sm: "100%", md: "300px", lg: "300px", xl: '300px'}}
        w={'full'}
        // bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
            h={'120px'}
            w={'full'}
            src={userData.cover_pic}
            objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
            <Avatar
                size={'xl'}
                src=''
                name={userData.firstname + userData.surename}
                alt={'User_image'}

            >
                <AvatarBadge
                    as={IconButton}
                    size="xs"
                    rounded="full"
                    border="0px"
                    top="50px"
                    colorScheme="blue"
                    aria-label="edit Image"
                    icon={<EditIcon />}
                />
            </Avatar>
        </Flex>

        <Box p={6}>
            <Stack spacing={0} align={'center'} mb={5}>
                <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                    {userData.firstname + " " + userData.surename}
                </Heading>
                <Text color={'gray.500'}>{userData.email[0] + userData.email[1] + userData.email[2] + "******@gmail.com"}</Text>
            </Stack>

            <Stack direction={'row'} justify={'center'} spacing={6}>
                <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>{userData.followers.length}</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                        Followers
                    </Text>
                </Stack>
                <Stack spacing={0} align={'center'}>
                    <Text fontWeight={600}>{userData.following.length}</Text>
                    <Text fontSize={'sm'} color={'gray.500'}>
                        Following
                    </Text>
                </Stack>
            </Stack>

            {userData && <Follow getUserprofile={getUserprofile} userId={userId} followers={userData.followers} following={userData.following} />}
            {userData && <UnFollow getUserprofile={getUserprofile} userId={userId} followers={userData.followers}  />}
        </Box>
    </Box></Center>
    ) : (<Loading />)


}
export default Profile