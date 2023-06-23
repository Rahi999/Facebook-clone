import { Box, Button } from "@chakra-ui/react"
import React from "react"

const Follow = ({userId}) => {
    return (
        <>
        <Box>
            Follow : {userId}
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
        </>
    )
}
export default Follow