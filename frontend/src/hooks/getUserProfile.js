import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import useShowToast from "./useShowToast";
const getUserProfile = ()=>{
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    const { username }=useParams();
    const showToast = useShowToast();
    useEffect(() => {
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
    }, [username,showToast]);
    return {user,loading};
}

export default getUserProfile;