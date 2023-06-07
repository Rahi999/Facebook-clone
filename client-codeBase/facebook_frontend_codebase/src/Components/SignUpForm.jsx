import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Radio,
  RadioGroup,
  useToast,
  useDisclosure
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import "./signupform.css"
import {saveCookies} from "../utils/saveCookies"

const SignUpForm = () => {

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [dob, setDOB] = useState('')
  const [gender, setGender] = useState('Male')
  const navigate = useNavigate()
  const toast = useToast()
  const { DEV_BASE_URL } = process.env

  const handleSubmit = () => {
    if (!firstName || !lastName) {
      toast({
        title: 'Name is required.',
        description: "Please enter first & last name.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!email) {
      toast({
        title: 'Email is required.',
        description: "Please enter an email.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!phone) {
      toast({
        title: 'Phone is required.',
        description: "Please enter your phone number.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!password) {
      toast({
        title: 'Password is required.',
        description: "Please set a password.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else if (!dob) {
      toast({
        title: 'DOB is required.',
        description: "Please select you date of birth.",
        position: "top",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
    }
    else {
      setLoading(true)
      const payload = {
        firstname: firstName,
        surename: lastName,
        mobile: phone,
        email: email,
        password: password,
        day: dob[8] + dob[9],
        month: dob[5] + dob[6],
        year: dob[0] + dob[1] + dob[2] + dob[3],
        gender: gender
      }
      axios.post(`${process.env.REACT_APP_DEV_BASE_URL}/users/signup`, payload)
        .then((res) => {
          toast({
            title: "Account created.",
            description: `${res.data.message}`,
            position: "top",
            status: 'success',
            duration: 5000,
            isClosable: true,
          })
          saveCookies('fb_token', res.data.token)
          setLoading(false)
          navigate('/')
        })
        .catch((err) => {
          toast({
            title: 'Something went wrong.',
            description: `${err.response.data.message}`,
            position: "top",
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
          setLoading(false)
        })


    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={0} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign Up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            It's quick and easy.
          </Text>
        </Stack>
        <hr />
        <Box
          rounded={'lg'}
          bg={useColorModeValue('gray.50', 'gray.800')}
          //   boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <Box id="firstlastnamebox">
              <Box>
                <FormControl id="firstName" isRequired>
                  <Input type="text"
                    placeholder='First name'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" >
                  <Input type="text"
                    placeholder='Last name'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Box>
            <FormControl id="email" isRequired>
              <Input type="email"
                placeholder='Email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="phone" isRequired>
              <Input type="tel"
                placeholder='Phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
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
              <br />
              <Text>Date of birth?</Text>
              <Input type="date" placeholder='DD / MM / YYYY'
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
              />

              <br />
              <br />
              <Text>Gender?</Text>
              <RadioGroup defaultValue='Male' onChange={setGender} value={gender}>
                <Stack spacing={5} direction='row' id="RadioBox">
                  <Box id="GenderRadio">
                    <Radio colorScheme='blue' value='Female'>
                      Female
                    </Radio>
                  </Box>
                  <Box id="GenderRadio">
                    <Radio colorScheme='blue' value='Male'>
                      Male
                    </Radio>
                  </Box>
                  <Box id="GenderRadio">
                    <Radio colorScheme='blue' value='Custom'>
                      Custom
                    </Radio>
                  </Box>
                </Stack>
              </RadioGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              {!loading ? (<Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>) : (<Button
              
              isLoading
              loadingText='Registering...'
              colorScheme='blue'
              spinnerPlacement='end'
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>)}
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'} >Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}

export default SignUpForm