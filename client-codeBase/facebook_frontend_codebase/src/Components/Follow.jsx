import { Box, Button, Toast, useToast } from "@chakra-ui/react"
import React from "react"
import { getCookies } from "../utils/getData"
import {useNavigate} from "react-router-dom"

const Follow = ({userId}) => {

    const toast = useToast()
    const navigate = useNavigate()
    const myId = getCookies("userId");

    const handleFollow = () => {
        if(myId && userId){

        }
        else{
            toast({
                description: "User not found",
                position: "top",
                status: "error",
                duration: "3000"
            })
            navigate("/dashboard")
        }
    }
    return (
        <>
        <Box>
            <Button onClick={handleFollow}
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
        </>
    )
}
export default Follow