import { useParams } from 'react-router';
import UserHeader from '../components/UserHeader';
import UserPost from './UserPost';
import {useState,useEffect} from 'react';

import useShowToast from '../hooks/useShowToast.js';
const UserPage = ()=>{
  const [user,setUser] = useState(null);
  const { username }=useParams();
  const showToast = useShowToast();
  useEffect(()=>{
    const getUser = async ()=>{
    try{
      const res = await fetch(`/api/users/profile/${username}`);
      const data = await res.json();
      if(data.error){
        showToast("Error",data.error,"error");
        return;
      }
      setUser(data);
    }catch(error){
      showToast("Error",error,"error");
    }
  };

  getUser();

  },[username,showToast]);

  if(!user) return null;
   return <>
     <UserHeader user={user} />
     <UserPost likes={12} replies={423} postImg="../post1.png"  postTitle="lets talk about post content"/>
     <UserPost likes={23} replies={123} postImg="../post2.png"  postTitle="lets talk about post content"/>
     <UserPost likes={12} replies={423} postImg="../post3.png"  postTitle="lets talk about post content"/>
   </>
   }
export default UserPage;