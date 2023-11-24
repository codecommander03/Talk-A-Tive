import React, { useState } from 'react'
import { VStack } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Button } from '@chakra-ui/button'
import { useToast } from '@chakra-ui/react'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [password, setPassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();

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
    const submitHandler = () => { }

    return <VStack spacing='5px'>
        <FormControl id='first-name' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder="Enter Your Name"
                onChange={(e) => setName(e.target.value)}>
            </Input>
        </FormControl>

        <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}>
                </Input>
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    onChange={(e) => setPassword(e.target.value)}
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
        onClick={submitHandler}>
            Sign Up
        </Button>
    </VStack>
}

export default Signup