import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Textarea,
  IconButton,
  Image,
  FormControl,
  FormLabel,
  Avatar
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";

const CreatePost = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const handleCreatePost = () => {
    // Handle post creation logic here
    console.log("Creating post:", { text, image });
    // Reset the state
    setText("");
    setImage("");
  };
  return (
    <>
      <Box
        p={4}
        width="100%"
        borderRadius="md"
        boxShadow="md"
      >
        <Flex alignItems="center" mb={4} gap="5">
          <Box as="label" htmlFor="upload-image" cursor="pointer">
            <Image src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png" size="4rem" title="Choose files" />
          </Box>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="upload-image"
          />
          <Textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={handleTextChange}
            resize="none"
            rows={3}
            borderColor="gray.300"
            borderRadius="md"
            p={2}
            flex="1"
          />
        </Flex>
        <Flex justifyContent="flex-start">
          {image && (
            <Box
              as="img"
              src={image}
              alt="Preview"
              maxH="200px"
              borderRadius="md"
              mb={4}
              border="3px solid"
            />
          )}
        </Flex>
        <Button colorScheme="blue" size="sm" width="100%" onClick={handleCreatePost}>
          Post
        </Button>
      </Box>
    </>
  );
};
export default CreatePost;
