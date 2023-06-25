import {
    ChakraProvider,
    CSSReset,
    Box,
    Slider,
    SliderTrack,
    SliderThumb,
    Flex,
    Text,
    Avatar
  } from "@chakra-ui/react";
  import axios from 'axios'
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCookies } from "../utils/getData";
  
  const Story = () => {
    
    const [videos, setVideos] = useState(null)
    const token = getCookies('fb_token')

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/story/getAll`, { headers: { "Authorization": `${token}` } })
        .then((res) => setVideos(res.data))
        .catch((err) => console.log(err))
    },[])

    const navigate = useNavigate()

    const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState([]);

  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (isPlaying[index]) {
        videoRef.play();
      } else {
        videoRef.pause();
      }
    });
  }, [isPlaying]);

  const handleVideoClick = (index) => {
    const newIsPlaying = [...isPlaying];
    newIsPlaying[index] = !newIsPlaying[index];
    setIsPlaying(newIsPlaying);
  };

    return (
      <>
        <CSSReset />
      <Box p={0}>
      <Flex
          maxW="800px"
          m="0 auto"
          overflowX="auto"
          flexWrap="nowrap"
          sx={{
            "&::-webkit-scrollbar": {
              height: "8px",
              width: "8px"
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "gray.300",
              borderRadius: "8px"
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "gray.400"
            }
          }}
        >
          {videos && videos.map((video, index) => {
            return (
              <Box
                key={video.id}
                bg=""
                borderRadius="md"
                boxShadow=""
                p={2}
                width="300px"
                textAlign="center"
                // border='2px solid'
              >
                <Box
                  bg="gray.800"
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                >
                  <Box
                  onClickCapture={() => navigate(`/video/${encodeURIComponent(video.url)}`)}
                    width="140px"
                    height="160px"
                    padding="1%"
                    paddingBottom="" // Aspect ratio of 16:9 (9 / 16 * 100%)
                    position="relative"
                    onClick={() => handleVideoClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={video.url}
                      controls={false}
                      autoPlay={false}
                      muted={false}
                    //   loop={true}
                      style={{ width: "100%", height: "100%" }}
                    />
                    {!isPlaying[index] && (
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          width="72px"
                          height="72px"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </Box>
                    )}
                    
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Box>
      </>
    );
  };
  export default Story;
  