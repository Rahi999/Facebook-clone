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
    RadioGroup
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import "./signupform.css"
  
  const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
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
                      <Input type="text" placeholder='First name' />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName" >
                      <Input type="text" placeholder='Last name' />
                    </FormControl>
                  </Box>
                </Box>
                <FormControl id="email" isRequired>
                  <Input type="email" placeholder='Email address' />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <Input type="tel" placeholder='Phone number' />
                </FormControl>
                <FormControl id="password" isRequired>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'} placeholder='New password' />
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
                  <Input type="date" placeholder='DD / MM / YYYY' />

                  <br />
                  <br />
                  <Text>Gender?</Text>
                  <RadioGroup defaultValue='2'>
                    <Stack spacing={5} direction='row' id="RadioBox">
                       <Box id="GenderRadio">
                       <Radio  colorScheme='blue' value='1'>
                        Female
                        </Radio>
                       </Box>
                      <Box id="GenderRadio">
                      <Radio colorScheme='blue' value='2'>
                        Male
                        </Radio>
                      </Box>
                     <Box id="GenderRadio">
                     <Radio colorScheme='blue' value='3'>
                        Custom
                        </Radio>
                     </Box>
                    </Stack>
                    </RadioGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
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