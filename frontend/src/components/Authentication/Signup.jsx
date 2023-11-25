import React, { useState,useRef } from 'react';
import { VStack } from '@chakra-ui/layout';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmpasswordRef = useRef(null);

    const keyName = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setTimeout(() => {
                emailRef.current.focus();
            },500)
        }
    }

    const keyEmail = (e) => {
        e.preventDefault();
        if (e.key === 'ArrowDown') {
            passwordRef.current.focus();
        }
        if (e.key === 'ArrowUp') {
            nameRef.current.focus();
        }
    }

    const keyPassword = (e) => {
        e.preventDefault();
        if (e.key === 'ArrowDown') {
            confirmpasswordRef.current.focus();
        }
        if (e.key === 'ArrowUp') {
            emailRef.current.focus();
        }
    }

    const keyConfirmPassword = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            passwordRef.current.focus();
        }
    }

    const handleClick = () => setShow(!show);
    const postDetails = (pics) => {
        setLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }
        
        console.log(pics);

        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'dticolvi6');
            fetch('https://api.cloudinary.com/v1_1/dticolvi6/image/upload', {
                method: 'post',
                body: data
            })
            .then(res => res.json())
            .then(data => {
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
        } else {
            toast({
                title: "Please select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }
    }
    const submitHandler = async () => {
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title: "Please fill all fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
            return;
        }
        if(password !== confirmpassword){
            toast({
                title: "Passwords do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const { data } = await axios.post('/api/user', { name, email, password, pic }, config);
            toast({
                title: "Registeration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            history.push('/chats');
        } catch (error) {
            toast({
                title: "Something went wrong",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            setLoading(false);
        }
    };

    return <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}
                ref={nameRef}
                onKeyDown={keyName}
            >
            </Input>
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
                onKeyDown={keyEmail}
                onKeyUp={keyEmail}
            >
                </Input>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    ref={passwordRef}
                    onKeyUp={keyPassword}
                    onKeyDown={keyPassword}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                    ref={confirmpasswordRef}
                    onKeyUp={keyConfirmPassword}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='pic'>
            <FormLabel>Upload Your Picture</FormLabel>
            <Input
                type='file'
                p={1.5}
                accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}>
            </Input>
        </FormControl>

        <Button
            colorScheme='green'
            width='100%'
            style={{ marginTop: 15 }}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
}

export default Signup 