import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  Image
} from '@chakra-ui/react';
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';

 const Login = () => {
  const navigate = useNavigate()
  const handleLogin = () => {
    localStorage.setItem('fb_token', 'abcd')
    navigate('/')
  }
  return (<>
    <SimpleGrid id="loginGrid"
     bg={useColorModeValue('gray.50', 'gray.800')}
     >
      <Box id="loginFirst">
         <Link to="/" >
         <Image id="LoginLogo" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Login Logo"/>
         </Link>
          <Text id="LoginText">
          Facebook helps you connect and share with the people in your life.
          </Text>
      </Box>
    <Box id="loginSecond" 
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder='Email adress' />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder='Password' />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link to="#" color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'#1877f2'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }} onClick={() => handleLogin()}>
                Log in
              </Button>
              <hr />
              <SignUp />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
    </SimpleGrid>
    </>
  );
}
export default Login