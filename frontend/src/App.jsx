import { Container } from "@chakra-ui/react"
import {Routes,Route, Navigate} from 'react-router-dom'
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdatePage from "./pages/updatePage";
import LogOutButton from "./components/logoutButton";
import CreatePost from "./components/CreatePost";
function App() {
 
   const user = useRecoilValue(userAtom)
   console.log(user);
  return (
    <Container maxW="620px">
      <Header />
      <Routes>
        <Route path="/" element={ user ?<HomePage />: <Navigate to={'/auth'} />} />
        <Route path="/auth" element={!user ?<AuthPage /> : <Navigate to={'/'}/>}/>
        <Route path="/update" element={user ?<UpdatePage /> : <Navigate to={'/'}/>}/>
        <Route path="/profile/:username" element={user ? <UserPage /> : <Navigate to={'/auth'} />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
      {user && <LogOutButton/>}
      {user && <CreatePost/>}
    </Container>
  );
};
export default App