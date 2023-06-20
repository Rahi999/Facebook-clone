import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import React, { ReactNode, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import Theme from './Theme';
import Loading from "./Loading"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { AiFillHome, AiOutlineUsergroupAdd, AiFillYoutube, AiFillShop, AiFillPlayCircle } from 'react-icons/ai';
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import { removeCookies } from '../utils/removeData';
import { getCookies } from "../utils/getData"
import FbTabs from "./Tabs"
const theme = localStorage.getItem('chakra-ui-color-mode')

const boxStyle = {
  border: theme === "light" ? "3px solid transparent" : "3px solid transparent",
};

const bgStyle = {
  backgroundColor: theme === "light" ? "white" : "black",
};


const LinkItems = [
  { name: 'Home', icon: FiHome, title: "Home" },
  { name: 'Trending', icon: FiTrendingUp, title: "Trending stories" },
  { name: "Story", icon: AiFillYoutube, title: "Stories" },
  { name: 'Friends', icon: AiOutlineUsergroupAdd, title: "Friends & Group" },
  { name: 'Profile', icon: FaUserCircle, title: "Profile" },
  { name: 'Settings', icon: FiSettings, title: "Profile setting" },
];


export default function SideBar({
  children
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent >
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box style={boxStyle} ml={{ base: 0, md: 350 }} p="8" height="100%" mt="-20" width="" padding="-20">
        {children}
      </Box>

    </Box>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {

  const [searchedUsers, setSearchedUsers] = useState(null)
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const token = getCookies('fb_token')

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    // Perform any actions with the updated searchInput value
    console.log(searchInput);
    console.log(searchInput.length)
    getSearchedData();
  }, [searchInput]);

  const getSearchedData = () => {
    if(searchInput.length > 3)
    console.log(token);
    console.log(searchInput)
    const encodedSearchInput = encodeURIComponent(searchInput);
    axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/profile/search/${encodedSearchInput}`, { headers: { "Authorization": `${token}` } })
      .then((res) => setFilteredResults(res.data))
      .catch((err) => null)
  }
  console.log(filteredResults)

  const handleSearch = () => {
    // localStorage.setItem("searched",text)
    // navigate("/searchedProducts")
  }

  const searchItems = (searchValue) => {
    // setSearchInput(searchValue);
    // const filterdata = ApiData.filter((item) => {
    //   return Object.values(item)
    //     .join("")
    //     .toLowerCase()
    //     .includes(searchInput.toLowerCase());
    // });
    // setFilteredResults(filterdata);
  };

  const navigate = useNavigate()
  const logout = () => {
    removeCookies("fb_token")
    removeCookies("userId")
    navigate("/login")
  }
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="0px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: '95%', sm: "95%", md: 320, lg: 300, xl: 300 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Avatar onClick={() => navigate("/")}
          cursor="pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
          size="md" />
        <Box style={{ display: "flex" }}
          ml={{ base: "0", sm: "0", md: "30%", lg: "-10%", lg: "-10%" }}
        >

          <Box title="Search For Products" class="container">
            <InputGroup
              width="300px"
              display={{ base: 'none', sm: "flex", md: 'none', lg: "none", xl: "none" }}
            >
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.500" />}
              />
              <Input
                type="text"
                border="1px"
                placeholder="Search Facebook"
                borderRadius="full"
                py="2"
                pl="10"
                onChange={handleInputChange}
              />
            </InputGroup>
            <Box onClick={() => handleSearch()} class="search"></Box>
          </Box>
          {filteredResults.length > 0 && (
            <Box
              style={bgStyle}
              className="abc"
              display={searchInput.length === 0 ? "none" : "inline"}
              width={{ base: "250px", sm: "300px", md: "300px", lg: "400px", xl: '400px' }}
            >
              {filteredResults.map((el) => {
                return (
                  <Link id="categoryAncer" to={`/user-profile/${el._id}`} >
                    <Box className="searchmap" onClick={() => setSearchInput("")}>
                      <Box style={{ width: "30px", height: "30px" }}>
                        <Avatar size={'xs'} borderRadius={'lg'} src={el.profile_pic} ></Avatar>
                      </Box>
                      {/* <a href={`/${item.category}/${item.title}/${item.id}`}>
                <p>{item.title}</p>
              </a> */}
                      <Text fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "14px", sl: "16px" }} >{el.firstname + " " + el.surename}</Text>
                    </Box>
                  </Link>

                );
              })}
            </Box>
          )}


        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} title={link.title}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};


const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'gray.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


const MobileNav = ({ onOpen, ...rest }) => {

  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = getCookies('userId')
  const token = getCookies('fb_token')

  useEffect(() => {
    if (userId && token) {
      setLoading(true)
      axios.get(`${process.env.REACT_APP_DEV_BASE_URL}/profile/getSingleUser/${userId}`, { headers: { "Authorization": `${token}` } })
        .then((res) => {
          setUserData(res.data)
          setLoading(false)
          // console.log(userData)
        })
        .catch((err) => {
          setLoading(false)
          navigate("/login")
        })
    }
    else {
      navigate("/login")
    }
  }, [])

  const [searchedUsers, setSearchedUsers] = useState(null)
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  useEffect(() => {
    // Perform any actions with the updated searchInput value
    setTimeout(() => {
      console.log(searchInput);
      getSearchedData();
    }, 3000)
  }, [searchInput]);

  const getSearchedData = () => {
    if(searchInput.length > 3){
      console.log(token);
    console.log(searchInput)
    const encodedSearchInput = encodeURIComponent(searchInput);
    axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/profile/search/${encodedSearchInput}`, { headers: { "Authorization": `${token}` } })
      .then((res) => setFilteredResults(res.data))
      .catch((err) => null)
    }
  }
  const navigate = useNavigate()
  const logout = () => {
    removeCookies("fb_token")
    removeCookies("userId")
    navigate("/login")
  }

  const handleSearch = () => {
    // localStorage.setItem("searched",text)
    //
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('', 'gray.900')}
      borderBottomWidth={{ base: '2px', md: '0px' }}
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>

      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />


      {/* <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text> */}
      {/* <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" size="md" /> */}

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'} justifyContent="space-evenly">

          <Menu>
            <Box style={{ display: "flex" }} mr={{ base: "2%", sm: "2%", md: "50%", lg: "0", xl: "" }} p="2">

              <Box title="Search Facebook" class="container" style={{ position: "relative" }}>
                <InputGroup
                  display={{ base: 'flex', sm: "none", md: 'none', lg: "none", xl: "flex" }}
                  mr={{ base: "2%", sm: "2%", md: "50%", lg: "0", xl: "10%" }}
                  mt={{ base: "", sm: "", md: "5", lg: "5", xl: "5" }}
                  width={{ base: "", md: "400px", lg: "300px", xl: "300px" }}>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.500" />}
                  />
                  <Input
                    type="text"
                    border="1px"
                    placeholder="Search Facebook"
                    borderRadius="full"
                    py="2"
                    pl="10"
                    onChange={handleInputChange}
                  />
                </InputGroup>
                <Box onClick={() => handleSearch()} class="search"></Box>
              </Box>
              {filteredResults.length > 0 && (
                <Box
                  style={bgStyle}
                  className="abc"
                  display={searchInput.length === 0 ? "none" : "inline"}
                  width={{ base: "250px", sm: "300px", md: "300px", lg: "400px", xl: '400px' }}
                >
                  {filteredResults.map((el) => {
                    return (
                      <Link id="categoryAncer" to={`/user-profile/${el._id}`} >
                        <Box className="searchmap" onClick={() => setSearchInput("")}>
                          <Box style={{ width: "30px", height: "30px" }}>
                            <Avatar size={'sm'} borderRadius={'lg'} src={el.profile_pic}></Avatar>
                          </Box>
                          {/* <a href={`/${item.category}/${item.title}/${item.id}`}>
                <p>{item.title}</p>
              </a> */}
                          <Text fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "14px", sl: "16px" }}>{el.firstname + " " + el.surename}</Text>
                        </Box>
                      </Link>

                    );
                  })}
                </Box>
              )}


            </Box>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    ''
                  }
                  name={userData.firstname + userData.surename}
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{userData.firstname}</Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem onClick={() => navigate(`/user-profile/${userId}`)}><Link to={`/user-profile/${userId}`}>Profile</Link></MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>  <Theme /></MenuItem>
              <MenuItem onClick={() => navigate("/login")}>
                <Link to="/login">LogIn</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};