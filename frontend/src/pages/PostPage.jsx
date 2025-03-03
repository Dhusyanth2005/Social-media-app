import { Box,Avatar, Flex, Image, Text, Divider, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import getUserProfile from "../hooks/getUserProfile";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";
import Comment from "../components/Comment";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
const PostPage = ()=>{
    
    const currentUser = useRecoilValue(userAtom);
    const {user,loading} = getUserProfile();
    const [posts,setPosts] = useRecoilState(postsAtom);
    const showToast = useShowToast();
    const { pid } = useParams();
    const currentpost = posts[0];
    useEffect(()=>{
        const getPost = async ()=>{
            try {
                const res = await fetch(`/api/post/${pid}`);
                const data = await res.json();
                if(data.error){
                    showToast("Error",data.error,"error");
                    return;
                }
                console.log(data);
                setPosts([data]);
            } catch (error) {
                showToast("Error",error.message,"error");
            }
        };
        getPost();

    },[showToast,pid,setPosts]);
    const Navigate = useNavigate();
    const handleDeletePost = async () => {
         
        try {
            
            if(!window.confirm("Are you sure you want to delete this post?")) return;
            const res = await fetch(`/api/post/${currentpost._id}`, {
                method: "DELETE"
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Post deleted successfully", "success");
            Navigate(`/profile/${user.username}`);
        } catch (error) {
            showToast("Error", error.message, "error");
        }


    }
    

    if(!user && loading){
        return (<flex justifyContent="center">
            <Spinner size={'xl'} />
        </flex>);
    }
    if(!currentpost) return null; 
    return(
     <>
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar src={user.profilePic} size={"md"} name='Mark Zuckerberg' />
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                    {user.username}
                    </Text>
                    <Image src='/verified.png' w='4' h={4} ml={4} />
                </Flex>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"xs"} w={36} textAlign={'right'}color={"gray.light"}>
                            {formatDistanceToNow(new Date(currentpost.createdAt))}
							</Text>
                            {currentUser?._id === user?._id && (
                                <DeleteIcon onClick={handleDeletePost} cursor={'pointer'}/>
                            )}
            </Flex>
        </Flex>
        <Text my={3}>{currentpost.text}</Text>
           {currentpost.img && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
            <Image src={currentpost.img} w={"full"} />
            </Box>
           )}
            <Flex gap={3} my={3}>
            <Actions post={currentpost} />
            </Flex>
           

            <Divider my={4}/>

            <Flex justifyContent={'space-between'}>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'2xl'}>👋</Text>
                    <Text color={'gray.light'}>Get the app to like and reply the post</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider my={4}/>
            {currentpost.replies.map((reply)=>(
                <Comment 
                key={reply._id}
                reply={reply}
                last={currentpost.replies[currentpost.replies.length-1]._id === reply._id}
                />
            ))}
          
            
    </>
    );
}

export default PostPage;