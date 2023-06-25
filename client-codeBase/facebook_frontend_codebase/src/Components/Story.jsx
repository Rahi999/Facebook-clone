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
import { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
  
  const Story = () => {

    const navigate = useNavigate()
    const videos = [
      {
        id: 1,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/Very-Sad-Song-status-Broken-Heart-WhatsApp-Status-Video-Breakup-Song-Hindi-_shorts%E2%80%8B_sad720P_HD.mp4",
        userProfile: {
          name: "John Doe",
          avatar: "/john-doe.jpg"
        }
      },
      {
        id: 2,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/New-Sad-Dj-Remix-Hindi-Old-Song-Full-Screen-WhatsApp-Status-2022-_-Mood-Off-WhatsApp-Status720P_HD.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 3,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/Very-Sad-Song-status-Broken-Heart-Whatsapp-Status-Video-Breakup-Song-Hindi-_shorts720P_HD.mp4",
        userProfile: {
          name: "John Doe",
          avatar: "/john-doe.jpg"
        }
      },
      {
        id: 4,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/Broken-heart-WhatsApp-status-sad-status-best-sad-shayari-status-shayari-status-_shorts720P_HD_2.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 5,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/tumhara-dil-itna-badsurat-hai-sad-dialogue-status-_faheemys-_new-_sadstatus-_shorts720P_HD.mp4",
        userProfile: {
          name: "John Doe",
          avatar: "/john-doe.jpg"
        }
      },
      {
        id: 6,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/sad-song-status-_-sad-status-_-full-screen-status-_-Broken-status-_-along720P_HD-1.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 7,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/Future-Ki-Tension-Lena-Very-Sad-Song-status-WhatsApp-status-video_Broken-Heart-Breakup_shorts720P_HD.mp4",
        userProfile: {
          name: "John Doe",
          avatar: "/john-doe.jpg"
        }
      },
      {
        id: 8,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/Samjhaya-bahot-_-_LoveNotes-__Short-video-status-%E2%9D%A4%EF%B8%8F720P_HD.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 9,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/4k-Sad-Shayari-WhatsApp-Status-II-Broken-Heart-Sad-Shayari-WhatsApp-Status-II720P_HD.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 10,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/So-Sad-Status-_-Sad-Shayari-_-True-Line_s-_-Breakup-Status-_-New-WhatsApp-Status-_-Heart-Broken720P_HD.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 11,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/Very-Sad-Song-status-Broken-Heart-Whatsapp-Status-Video-Breakup-Song-Hindi-_shorts720P_HD_1.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 12,
        url:
          "https://mobstatus.com/wp-content/uploads/2022/10/shorts-sad-status-new-_-new-status-2022-mood-off-status-broken-heart-status-love_brekup-_sad720P_HD.mp4",
        userProfile: {
          name: "Jane Smith",
          avatar: "/jane-smith.jpg"
        }
      },
      {
        id: 13,
        url:
          "https://mobstatus.com/wp-content/uploads/2021/12/Pehle-The-Hase-Jitna-Ab-Utna-Bura-Lagta-Ha-status-video.mp4",
        userProfile: {
          name: "Rahi",
          avatar: ""
        }
      }
    ];

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
          {videos.map((video, index) => {
            return (
              <Box
                key={video.id}
                bg=""
                borderRadius="md"
                boxShadow=""
                p={4}
                width="300px"
                textAlign="center"
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
                    <Flex align="center" mt={2} justifyContent="center">
                      <Avatar
                        size="xs"
                        name={video.userProfile.name}
                        src={video.userProfile.avatar}
                        mr={2}
                      />
                      <Text color="black" fontWeight="">
                        {video.userProfile.name}
                      </Text>
                    </Flex>
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
  