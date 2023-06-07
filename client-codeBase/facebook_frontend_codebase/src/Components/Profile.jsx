import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
} from '@chakra-ui/react';
import { getCookies } from "../utils/getData";

const Profile = () => {

    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const userId = params.userId
    const id = getCookies('userId')
    // console.log(userId, id)
    const token = getCookies('fb_token')
    const navigate = useNavigate()

    useEffect(() => {
        if (userId && token) {
            setLoading(true)
            axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${userId}`, { headers: { "Authorization": `${token}` } })
                .then((res) => {
                    setUserData(res.data)
                    setLoading(false)
                    console.log(userData)
                })
                .catch((err) => {
                    setLoading(false)
                })
        }
        else {
            navigate("/login")
        }
    }, [])
    return(
        <Center py={6}>
            {userData ? (<Box
                maxW={'270px'}
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
                        alt={'Author'}
                    />
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={'center'} mb={5}>
                        <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                            {userData.firstname + " " + userData.surename}
                        </Heading>
                        <Text color={'gray.500'}>{userData.email[0]+userData.email[1]+userData.email[2]+"******@gmail.com"}</Text>
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
                                Followeing
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        marginTop="10%"
                        width="70%"
                        flex={1}
                        fontSize={'sm'}
                        rounded={'full'}
                        bg={'blue.400'}
                        color={'white'}
                        boxShadow={
                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                        }
                        _hover={{
                            bg: 'blue.500',
                        }}
                        _focus={{
                            bg: 'blue.500',
                        }}>
                        Follow
                    </Button>
                </Box>
            </Box>) : (<p>...loading</p>)}
        </Center>
    )
}
export default Profile