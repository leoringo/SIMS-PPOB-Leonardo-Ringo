'use client'

import {
    Button,
    Flex,
    Text,
    Heading,
    Input,
    Stack,
    HStack,
    Image,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    IconButton
} from '@chakra-ui/react'
import {
    AtSignIcon,
    LockIcon,
    ViewIcon
} from '@chakra-ui/icons'
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { loginUser } from '../store/actions/actionCreator';
import loginImage from '../assets/Illustrasi login.png'
import logo from '../assets/Logo.png'
import ErrorAlert from '../components/Alert';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState ("")
    const [showPass, setShowPass] = useState(false)
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const handlePass = () => setShowPass(!showPass)

    const eventHandler = (event) => {
        setLogin ((input) => {
            return {...input, [event.target.name]: event.target.value}
        })
    }

    const submitForm = (event) => {
        event.preventDefault()
        dispatch(loginUser(login))
                .then(() => {
                    navigate('/')
                }).catch((error) => {
                    setErrorMessage(error.response.data.message)
                });
    }
   
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack w={'full'} maxW={'md'}>
                    <HStack justify={'center'} spacing={2}>
                        <Image src={logo} w={30} />
                        <Text fontWeight={'bold'} fontSize={'2xl'}>SIMS PPOB</Text>
                    </HStack>
                    <Stack align={'center'} fontSize={'2xl'} paddingBottom={'2vh'}>
                        <Heading>Masuk atau buat akun</Heading>
                        <Heading>untuk memulai</Heading>
                    </Stack>
                    <Stack spacing={6}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <AtSignIcon color="gray.300" />
                            </InputLeftElement>
                            <Input type="email" name="email" value={login.email} onChange={eventHandler} placeholder="masukan email anda" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <LockIcon color="gray.300" />
                            </InputLeftElement>
                            <InputRightElement>
                                <IconButton colorScheme="white" color="gray.300" icon={<ViewIcon onClick={handlePass} />} />
                            </InputRightElement>
                            <Input type={showPass ? 'text' : 'password'} name="password" value={login.password} onChange={eventHandler} placeholder="masukan password anda" />
                        </InputGroup>
                    </Stack>
                    <Stack paddingTop={'4vh'}>
                        <Button colorScheme={'red'} variant={'solid'} onClick={submitForm}>
                            Masuk
                        </Button>
                        <Text align={'center'} paddingTop={'1vh'}>Belum punya akun? registrasi <Link to={'/register'} style={{ color: 'red' }}>di sini!</Link></Text>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1} background="red" height={'100vh'}>
                <Image
                    alt={'Login Image'}
                    w={'full'}
                    src={loginImage}
                />
            </Flex>
            <ErrorAlert errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
        </Stack>
    )
}

export default Login