import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";

const CreateStoryBox = ( { handleCreateStory} ) => {
    const theme = localStorage.getItem('chakra-ui-color-mode')
    return(<>
     <Box
      onClick={handleCreateStory}
      bg={theme=="light" ? "gray.200" : ""}
      borderRadius="20px"
      boxShadow="sm"
      p={4}
      cursor="pointer"
      _hover={{ bg: "gray.600" }}
    //   border={'2px solid red'}
    mt={'8px'}
      width={'140px'}
      height={'165px'}
    >
      <Flex align="center" justify="center" mb={2} 
    //   border={'2px solid'}
      >
        <IconButton
          icon={<AddIcon />}
          size="md"
          bg=""
          borderRadius="full"
          mr={2}
        />
        <Text fontWeight="bold">Create Story</Text>
      </Flex>
      <Text color="">Share your story with friends</Text>
    </Box>
    </>)
}
export default CreateStoryBox