import UserHeader from '../components/UserHeader';
import UserPost from './UserPost';
const UserPage = ()=>{
   return <>
     <UserHeader/>
     <UserPost likes={12} replies={423} postImg="../post1.png"  postTitle="lets talk about post content"/>
     <UserPost likes={23} replies={123} postImg="../post2.png"  postTitle="lets talk about post content"/>
     <UserPost likes={12} replies={423} postImg="../post3.png"  postTitle="lets talk about post content"/>
   </>
   }
export default UserPage;