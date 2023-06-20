import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    Flex,
    Textarea,
    IconButton,
    Image,
    FormControl,
    FormLabel,
    Avatar,
    useToast
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
import { CloseIcon } from "@chakra-ui/icons";
import Uploading from "./Uploading";
import { getCookies } from "../utils/getData";

const CreatePost = ({getPosts}) => {
    const [text, setText] = useState("");
    const [image, setImage] = useState("");
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const [loading, setLoading] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const toast = useToast()

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    const formattedDateTime = currentDateTime.toLocaleString('en-US', options);

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleImageChange = async (event) => {
        const selectedImage = event.target.files[0];
        const imageURL = URL.createObjectURL(selectedImage);
        setImage(imageURL);
        console.log(image)
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
        try {
            setLoading(true);
            const res = await axios.post(process.env.REACT_APP_CLOUDINARY_BASE_URL, formData);
            const imageUrl = res.data.secure_url;
            setCloudinaryImage(res.data.secure_url)
            console.log(imageUrl)
            setLoading(false)
        } catch (err) {
            toast({
                title: "Uploading failed",
                position: "top",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
            setLoading(false)
            console.error(err);
        }
    };

    const handleCreatePost = async () => {
       if(!text || !cloudinaryImage){
        toast({
            title: "cann't create empty post.",
            position: "top",
            status: 'info',
            duration: 3000,
            isClosable: true,
        })
       }
       else{
        setLoading(true)
        const userId = getCookies('userId')
        const token = getCookies("fb_token")
        console.log(cloudinaryImage)
        try {
            const payload = {
                type: "POST",
                text: text,
                images: cloudinaryImage,
                date: formattedDateTime,
                user: userId,
            }
            console.log(payload)
            axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/post/create`, payload)
                .then((res) => {
                    toast({
                        title: res.data.message,
                        position: "top",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    setLoading(false)
                    setImage("")
                    setText("")
                    getPosts()
                })
                .catch((err) => {
                    setLoading(false)
                    toast({
                        title: err.response.data.message,
                        position: "top",
                        status: 'error',
                        duration: 3000,
                        isClosable: false,
                    })
                })
        }
        catch (err) {
            setLoading(false)
            console.log(err)
            toast({
                title: err.response.data.message,
                position: "top",
                status: 'error',
                duration: 3000,
            })
        }
       }

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
                    {loading ? <Box width="100%"><Uploading /></Box> : image && (
                        <Box>
                            <Flex justifyContent="flex-end" cursor='pointer' onClick={() => setImage("")} title="Remove selected image">
                                <Image width="8" src="https://www.freeiconspng.com/thumbs/close-button-png/close-button-png-27.png" alt="close-icon" />
                            </Flex>
                            <Box
                                as="img"
                                src={image}
                                alt="Preview"
                                maxH="200px"
                                borderRadius="md"
                                mb={4}
                            />
                        </Box>
                    )}
                </Flex>
                <Button title="Click to post" colorScheme="blue" size="sm" width="100%" onClick={handleCreatePost}>
                    Post
                </Button>
            </Box>
        </>
    );
};
export default CreatePost;
