import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const SingleVideo = () => {
    const params = useParams()

    const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState([]);
  const index = '1'

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
    return  (<>
        <Box
                // key={video.id}
                // border='2px solid'
                m='auto'
                bg=""
                borderRadius="md"
                boxShadow=""
                p={4}
                // width="400px"
                width={{base: "100%", sm: "100%", md: "400px", lg: "400px", xl: "400px"}}
                textAlign="center"
              >
                <Box
                  bg="gray.800"
                  borderRadius="md"
                  overflow="hidden"
                  position="relative"
                >
                  <Box
                    width="100%"
                    height="95vh"
                    padding="1%"
                    paddingBottom="" // Aspect ratio of 16:9 (9 / 16 * 100%)
                    position="relative"
                    onClick={() => handleVideoClick(index)}
                    style={{ cursor: "pointer" }}
                  >
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={params.videoSrc}
                      controls={false}
                      autoPlay={true}
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
                    <Flex align="center" mt={2} justifyContent="center">
                      {/* <Avatar
                        size="xs"
                        name={video.userProfile.name}
                        src={video.userProfile.avatar}
                        mr={2}
                      /> */}
                      <Text color="black" fontWeight="">
                        {/* {video.userProfile.name} */}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Box>
        </>
    )
}
export default SingleVideo