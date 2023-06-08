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
        size="full">
        <DrawerContent >
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 350 }} p="8" height="100vh" mt="-20">
        <FbTabs />
      </Box>

    </Box>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
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
      w={{ base: 'full', md: 320 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" size="md" />
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
          console.log(userData)
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
  const navigate = useNavigate()
  const logout = () => {
    removeCookies("fb_token")
    removeCookies("userId")
    navigate("/login")
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
            <InputGroup
              mr={{ base: "2%", sm: "2%", md: "50%" }}
              mt={{ base: "", sm: "", md: "5", lg: "5", xl: "5" }}
              width={{ base: "", md: "600px" }}>
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
              />
            </InputGroup>
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