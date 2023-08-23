'use client'

import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import { PhoneIcon } from '@chakra-ui/icons'
import loginImage from '../assets/Illustrasi login.png'

const Register = () => {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
            <Stack spacing={0}>
                <Heading fontSize={'2xl'} align={'center'}>Lengkapi data untuk</Heading>
                <Heading fontSize={'2xl'} align={'center'}>membuat akun</Heading>
            </Stack>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" />
          </FormControl>
          <InputGroup>
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} background="red" height={'100vh'}>
        <Image
          alt={'Login Image'}
        //   objectFit={'cover'}
          w={'full'}
          src={loginImage}
        />
      </Flex>
    </Stack>
  )
}

export default Register