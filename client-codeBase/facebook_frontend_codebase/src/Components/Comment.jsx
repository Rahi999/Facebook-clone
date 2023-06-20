import { Box, Text } from "@chakra-ui/react"
import React from "react"
import { useParams } from "react-router-dom"

const Comment = () => {
    const params = useParams()
    return (<>
        <Box>
            <Text>Comment : {params.postId}</Text>
        </Box>
    </>)
}
export default Comment