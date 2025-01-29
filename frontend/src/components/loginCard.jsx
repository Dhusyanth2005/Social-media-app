import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,

} from '@chakra-ui/react'
import { useState } from 'react'
import { useSetRecoilState} from 'recoil'
import authScreenAtom from '../atoms/authAtom.js'
import userAtom from '../atoms/userAtom.js'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import useShowToast from '../hooks/useShowToast.js'
export default function LoginCard() {

    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreen = useSetRecoilState(authScreenAtom)
    const setUser = useSetRecoilState(userAtom)
    const [loading, setLoading] = useState(false);
    
	const [inputs, setinputs] = useState({
		username: "",
		password: "",
	});
	const showToast = useShowToast();
	const handleLogin = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/users/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});
			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			localStorage.setItem("user-threads", JSON.stringify(data));
			setUser(data);
		} catch (error) {
			showToast("Error", error, "error");
		} finally {
			setLoading(false);
		}
	};
    return (
        <Flex
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} maxW={'md'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading 
                        fontSize={'4xl'} 
                        textAlign={'center'}
                    >
                        Login
                    </Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'lg'}
                    p={10}
                    position="relative"
                    _before={{
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: 'lg',
                        padding: '2px',
                        background: 'linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff)',
                        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'xor',
                        maskComposite: 'exclude',
                        animation: 'gradient 4s linear infinite',
                    }}
                    sx={{
                        '@keyframes gradient': {
                            '0%': {
                                background: 'linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff)',
                            },
                            '50%': {
                                background: 'linear-gradient(145deg, transparent 35%, #40c9ff, #e81cff)',
                            },
                            '100%': {
                                background: 'linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff)',
                            },
                        },
                    }}
                    w={
                        {
                            base: '100%',
                            sm:'400px',
                        }
                    }
                >
                    <Stack spacing={4}>
                        <FormControl  isRequired>
                            <FormLabel>UserName</FormLabel>
                            <Input type="email" 
                            onChange={(e)=>setinputs({ ...inputs,username:e.target.value})}
                            value={inputs.username}/>
                        </FormControl>
                        <FormControl  isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'}
                                onChange={(e)=>setinputs({...inputs,password:e.target.value})} 
                                value={inputs.password}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                        <Button
								loadingText='Logging in'
								size='lg'
								bg={useColorModeValue("gray.600", "gray.700")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("gray.700", "gray.800"),
								}}
								onClick={handleLogin}
								isLoading={loading}
							>
								Login
							</Button>
                        </Stack>
                        
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don't have an account?{" "}
                                <Button
                                    variant="link"
                                    color="blue.400"
                                    onClick={() => setAuthScreen('signup')}
                                    
                                >
                                    sign up
                                </Button>

                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}