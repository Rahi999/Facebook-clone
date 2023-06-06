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
  Image,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import "./login.css"
import { Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import { useState } from 'react';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const handleLogin = () => {
    alert(email + password)
  }
  return (<>
    <SimpleGrid id="loginGrid"
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box id="loginFirst">
        <Link to="/" >
          <Image id="LoginLogo" src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg" alt="Login Logo" />
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
                <Input type="email" placeholder='Email adress' onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'}
                    placeholder='New password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
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