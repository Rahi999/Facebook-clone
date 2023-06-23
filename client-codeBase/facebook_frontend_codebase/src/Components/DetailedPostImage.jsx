import { Box } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const DetailedPostImage = () => {
    
    const params = useParams()
    const imageSrc = params.src
    return (
        <>
            <Box>
                Detailed Post Image
            </Box>
        </>
    )
}
export default DetailedPostImage