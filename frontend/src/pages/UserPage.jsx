import { useParams } from 'react-router';
import UserHeader from '../components/UserHeader';
import {useState,useEffect} from 'react';
import { Flex } from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast.js';
import { Spinner } from '@chakra-ui/react';
import Post from '../pages/Post';
import getUserProfile from '../hooks/getUserProfile';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom.js';

const UserPage = ()=>{
 
  const { user,loading } = getUserProfile();
  const { username }=useParams();
  const showToast = useShowToast();
  const [posts,setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts,setFetchingPosts] = useState(true);
  useEffect(()=>{
    
    

  const getPosts = async ()=>{
    setFetchingPosts(true);
    try{
      const res = await fetch(`/api/post/user/${username}`);
      const data = await res.json();
      console.log(data);
      setPosts(data);
      console.log(posts);
    }catch(error){
      showToast("Error",error.message,"error");
      setPosts([]);
    }finally{
      setFetchingPosts(false);
    }
  }

  
  getPosts();

  },[username,showToast,setPosts]);
  console.log("postsatom in atom",posts);
  
  if(!user && loading){
    return (
      <Flex justifyContent="center" >
      <Spinner size={'xl'} />
      </Flex>
    )
  }
  if(!user && !loading) return <h1>user not found</h1>;
   return <>
     <UserHeader user={user} />
     {!fetchingPosts && posts.length === 0 && <h1>No posts found</h1>}
     {fetchingPosts && <Flex justifyContent="center" >
      <Spinner size={'xl'} />
      </Flex>}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}

   </>
   }
export default UserPage;