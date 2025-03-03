import { Container ,Box} from "@chakra-ui/react"
import {Routes,Route, Navigate} from 'react-router-dom'
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdatePage from "./pages/updatePage";
import CreatePost from "./components/CreatePost";
import { useLocation } from "react-router-dom";
function App() {
   const {pathname} = useLocation();
   const user = useRecoilValue(userAtom)
   console.log(user);
  return (
    <Box position={'relative'} w='full'>
    <Container maxW={pathname ==="/" ? { base: "620px", md: "900px" } : "620px"}>
      <Header />
      <Routes>
        <Route path="/" element={ user ?<HomePage />: <Navigate to={'/auth'} />} />
        <Route path="/auth" element={!user ?<AuthPage /> : <Navigate to={'/'}/>}/>
        <Route path="/update" element={user ?<UpdatePage /> : <Navigate to={'/'}/>}/>
        <Route path="/profile/:username" element={
							user ? (
								<>
									<UserPage />
									<CreatePost />
								</>
							) : (
								<UserPage/>
							)
						} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
     
      
    </Container>
    </Box>
  );
};
export default App