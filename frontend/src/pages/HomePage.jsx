import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom"; // Adjust the import path as needed
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import postsAtom from "../atoms/postsAtom"; // Adjust the import path as needed
import Post from "./Post";
import SuggestedUsers from "../components/SuggestedUsers";
const HomePage = () => {
    const [posts,setPosts]= useRecoilState(postsAtom);
    const [loading,setLoading]=useState(true);
    const showToast = useShowToast()
    useEffect(() => {
        console.log("Updated posts:", posts);
    }, [posts]); // Runs every time `posts` changes
    
    useEffect(()=>{
        const getFeedPosts = async ()=>{
            setLoading(true);
            setPosts([]);
            try{
               const res = await fetch("api/post/feed");
               const data = await res.json();
               console.log(data);
               if(data.error){
                showToast("Error",data.error,"error");
               }
               setPosts(data);
               
            }catch(err){
              showToast("Error",err.message,"error") 
            }finally{
                setLoading(false);
            }
        }
        getFeedPosts();
    },[showToast,setPosts]);
    const user = useRecoilValue(userAtom);
    
    return (
        <Flex gap='10' alignItems={'flex-start'}>
        <Box flex={70}>
            {!loading && posts.length === 0 && <h1>Follow some users to see the feeds</h1>}
            {loading && (
                <Flex justify={'center'}>
                <Spinner size={'xl'}/>
                </Flex>
            )}
        {posts.map((post)=>
            <Post key={post._id} post={post} postedBy={post.postedBy} />
        )}
        
        </Box>
        <Box flex={30} display={{
					base: "none",
					md: "block",
				}}>
        <SuggestedUsers/>
        </Box>
        
        </Flex>
    )
}

export default HomePage;