import { Flex, Spinner } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom"; // Adjust the import path as needed
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import Post from "./Post";
const HomePage = () => {
    const [posts,setPosts]= useState([]);
    const [loading,setLoading]=useState(true);
    const showToast = useShowToast()
    useEffect(()=>{
        const getFeedPosts = async ()=>{
            setLoading(true);
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
    },[showToast])
    const user = useRecoilValue(userAtom);
    
    return (
        <>

{!loading && posts.length === 0 && <h1>Follow some users to see the feeds</h1>}
        {loading && (
            <Flex justify={'center'}>
            <Spinner size={'xl'}/>
            </Flex>
        )}
       {posts.map((post)=>
          <Post key={post._id} post={post} postedBy={post.postedBy} />
       )}
       
        </>
    )
}

export default HomePage;