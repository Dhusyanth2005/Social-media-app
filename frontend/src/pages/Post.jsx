import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Actions from '../components/Actions'
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNow} from 'date-fns';

const Post = ({ post,postedBy}) =>{
    const [liked, setLiked] = useState(false);
    const showToast = useShowToast();
    const [user,setUser]=useState(null)

    const Navigate = useNavigate()
    useEffect(() => {
        const getUser = async () => {
            if (!postedBy || !postedBy._id) return; // Ensure postedBy exists
            try {
                const res = await fetch(`/api/users/profile/${postedBy._id}`);
                const data = await res.json();
                console.log(data)
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                setUser(data)
            } catch (err) {
                showToast("Error", err.message, "error");
                setUser(null)
            }
        };
    
        getUser();
    }, [postedBy, showToast]);
    
    if(!user) return null;
    return (
        <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size="md" name={user.name} src={user.profilePic} 
            onClick={(e)=>{
                e.preventDefault()
                Navigate(`/${user.username}`)
            }}
            />
            <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
            <Box position={"relative"} w={'full'}>
                {post.replies.length === 0 && <Text textAlign={'center'}>🥱</Text>}
                {post.replies[0] &&(
                   <Avatar
                   size="xs"
                   name="mark zucker"
                   src={post.replies[0].userProfilePic}
                   position={"absolute"}
                   top={"0px"}
                   left="15px"
                   padding={"2px"}
                   /> 
                )}
                {post.replies[1] &&(
                   <Avatar
                   size="xs"
                   name="mark zucker"
                   src={post.replies[1].userProfilePic}
                   position={"absolute"}
                   top={"0px"}
                   left="15px"
                   padding={"2px"}
                   /> 
                )}
                {post.replies[2] &&(
                   <Avatar
                   size="xs"
                   name="mark zucker"
                   src={post.replies[2].userProfilePic}
                   position={"absolute"}
                   top={"0px"}
                   left="15px"
                   padding={"2px"}
                   /> 
                )}
               
               
            </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
					<Flex justifyContent={"space-between"} w={"full"}>
						<Flex w={"full"} alignItems={"center"}>
							<Text fontSize={"sm"} fontWeight={"bold"}
                             onClick={(e)=>{
                                e.preventDefault()
                                Navigate(`/${user.username}`)
                            }}
                            >
								{user.username}
							</Text>
							<Image src='../verified.png' w={4} h={4} ml={1} />
						</Flex>
						<Flex gap={4} alignItems={"center"}>
							<Text fontSize={"xs"} w={36} textAlign={'right'}color={"gray.light"}>
                            {formatDistanceToNow(new Date(post.createdAt))}
							</Text>
							
						</Flex>
					</Flex>

					<Text fontSize={"sm"}>{post.text}</Text>
					
                    {post.img && (
						<Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
							<Image src={post.img} w={"full"} />
						</Box>
					)}
                        <Flex gap={3} my={1}>
						<Actions liked={liked} setLiked={setLiked} />
					</Flex>

					<Flex gap={2} alignItems={"center"}>
						<Text color={"gray.light"} fontSize='sm'>
							{post.replies.length} replies
						</Text>
						<Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
						<Text color={"gray.light"} fontSize='sm'>
							{post.likes.length} likes
						</Text>
					</Flex>
                    
				</Flex>
            </Flex> 
        </Link>
    );
};
export default Post;