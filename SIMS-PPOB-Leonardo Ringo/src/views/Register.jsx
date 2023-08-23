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
import { ImUser } from "react-icons/im";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"
import { registerUser } from '../store/actions/actionCreator';
import loginImage from '../assets/Illustrasi login.png'
import logo from '../assets/Logo.png'

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [showPass, setShowPass] = useState(false)
    const [showVerifPass, setShowVerifPass] = useState(false)
    const [register, setRegister] = useState({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        verifPassword: ""
    })

    const eventHandler = (event) => {
        setRegister ((input) => {
            console.log({...input, [event.target.name]: event.target.value});
            return {...input, [event.target.name]: event.target.value}
        })
    }

    const submitForm = (event) => {
        event.preventDefault()
        if(register.password !== register.verifPassword) {
            console.log(`PASSWORD NYA GAK SESUAI`);
        } else {
            dispatch(registerUser(register))
                    .then(() => {
                        navigate('/login')
                    }).catch((err) => {
                        console.log(err, `DARI ERROR PROMISE`);
                    });
        }
    }
    const handlePass = () => setShowPass(!showPass)
    const handleVerifPass = () => setShowVerifPass(!showVerifPass)

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack w={'full'} maxW={'md'}>
                    <HStack justify={'center'} spacing={2}>
                        <Image src={logo} w={30} />
                        <Text fontWeight={'bold'} fontSize={'2xl'}>SIMS PPOB</Text>
                    </HStack>
                    <Stack align={'center'} fontSize={'2xl'} paddingBottom={'2vh'}>
                        <Heading>Lengkapi data untuk</Heading>
                        <Heading>membuat akun</Heading>
                    </Stack>
                    <Stack spacing={6}>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <AtSignIcon color="gray.300" />
                            </InputLeftElement>
                            <Input type="email" name="email" value={register.email} onChange={eventHandler} placeholder="masukan email anda" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <ImUser color="darkgrey" />
                            </InputLeftElement>
                            <Input type="text" name="first_name" value={register.first_name} onChange={eventHandler} placeholder="nama depan" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <ImUser color="darkgrey" />
                            </InputLeftElement>
                            <Input type="text" name="last_name" value={register.last_name} onChange={eventHandler} placeholder="nama belakang" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <LockIcon color="gray.300" />
                            </InputLeftElement>
                            <InputRightElement>
                                <IconButton colorScheme="white" color="gray.300" icon={<ViewIcon onClick={handlePass} />} />
                            </InputRightElement>
                            <Input type={showPass ? 'text' : 'password'} name="password" value={register.password} onChange={eventHandler} placeholder="buat password" />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none">
                                <LockIcon color="gray.300" />
                            </InputLeftElement>
                            <InputRightElement>
                                <IconButton colorScheme="white" color="gray.300" icon={<ViewIcon onClick={handleVerifPass} />} />
                            </InputRightElement>
                            <Input type={showVerifPass ? 'text' : 'password'} name="verifPassword" value={register.verifPassword} onChange={eventHandler} placeholder="konfirmasi password" />
                        </InputGroup>
                    </Stack>
                    <Stack paddingTop={'4vh'}>
                        <Button colorScheme={'red'} variant={'solid'} onClick={submitForm}>
                            Registrasi
                        </Button>
                        <Text align={'center'} paddingTop={'1vh'}>Sudah punya akun? login <Link to={'/login'} style={{ color: 'red' }}>di sini!</Link></Text>
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