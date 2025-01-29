import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
  } from '@chakra-ui/react';
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from '../hooks/usePreviewImg';
import useShowToast from '../hooks/useShowToast.js';
  
export default function UpdatePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const { handleImageChange, imgUrl } = usePreviewImg();
	const [inputs, setInputs] = useState({
		name: user.name,
		username: user.username,
		email: user.email,
		bio: user.bio,
		password: "",
	});
  const [updating, setUpdating] = useState(false);
  const fileRef = useRef(null);
  const showToast =useShowToast();
  const handleSubmit = async (e) => {
		e.preventDefault();
		if (updating) return;
		setUpdating(true);
		try {
			const res = await fetch(`/api/users/update/${user._id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
			});
			const data = await res.json(); // updated user object
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Profile updated successfully", "success");
			setUser(data);
			localStorage.setItem("user-threads", JSON.stringify(data));
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setUpdating(false);
		}
	};
    return (
      <form onSubmit={handleSubmit}>
      <Flex
        align={'center'}
        justify={'center'}
        my={6}
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" boxShadow={'md'} src={imgUrl||user.profilePic}/> 
              </Center>
              <Center w="full">
                <Button 
                onClick={() => fileRef.current.click()}
                w="full" 
                bg={'gray.500'}
              color={'gray.900'}
              _hover={{
                color:'gray.100',
                bg: 'black.400',
              }}>Change Icon</Button>
              <Input type='file' hidden ref={fileRef} onChange={handleImageChange} />
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Johndoe"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="johndoe20"
              value={inputs.username}
               onChange={(e)=>setInputs({ ...inputs,username:e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your Bio."
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'gray.500'}
              color={'gray.900'}
              w="full"
              _hover={{
                color:'gray.100',
                bg: 'black.400',
              }}>
              Cancel
            </Button>
            <Button
              type='submit'
              isLoading={updating}
              bg={'gray.500'}
              color={'gray.900'}
              w="full"
              _hover={{
                color:'gray.100',
                bg: 'black.400',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </form>
    );
  }