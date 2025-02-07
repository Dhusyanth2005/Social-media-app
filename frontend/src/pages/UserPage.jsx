import { useParams } from 'react-router';
import UserHeader from '../components/UserHeader';
import UserPost from './UserPost';
import {useState,useEffect} from 'react';
import { Flex } from '@chakra-ui/react';
import useShowToast from '../hooks/useShowToast.js';
import { Spinner } from '@chakra-ui/react';
const UserPage = ()=>{
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);
  const { username }=useParams();
  const showToast = useShowToast();
  useEffect(()=>{
    
    const getUser = async ()=>{
    try{
      console.log("Fetching user profile for:", username);

      const res = await fetch(`/api/users/profile/${username}`);
      const data = await res.json();
      if(data.error){
        showToast("Error",data.error,"error");
        return;
      }
      setUser(data);
    }catch(error){
      showToast("Error",error,"error");
    }finally{
      setLoading(false);
    }
  };

  getUser();

  },[username,showToast]);
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
     <UserPost likes={12} replies={423} postImg="../post1.png"  postTitle="lets talk about post content"/>
     <UserPost likes={23} replies={123} postImg="../post2.png"  postTitle="lets talk about post content"/>
     <UserPost likes={12} replies={423} postImg="../post3.png"  postTitle="lets talk about post content"/>
   </>
   }
export default UserPage;