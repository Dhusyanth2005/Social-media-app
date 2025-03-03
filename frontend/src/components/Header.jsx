import { Image, Flex,useColorMode,Link,Button } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useRecoilValue,useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useLogout from "../hooks/useLogout";
import authAtom from "../atoms/authAtom";
const Header= ()=> {
    const {colorMode, toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom);
    const Logout = useLogout();
	const setAuthScreen = useSetRecoilState(authAtom);
  return (
    <Flex justifyContent={"space-between"} mt={6} mb='12'>
			{user && (
				<Link as={RouterLink} to='/'>
					<AiFillHome size={24} />
				</Link>
			)}
			{!user && (
				<Link as={RouterLink} to={'/auth'} onClick={
					()=>setAuthScreen("login")
				}>
					Login
				</Link>
			)}

			<Image
				cursor={"pointer"}
				alt='logo'
				w={6}
				src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
				onClick={toggleColorMode}
			/>

      {user && (
		<Flex alignItems={"center"} gap={4}>
        <Link as={RouterLink} to={`/profile/${user.username}`}>
          <RxAvatar size={24} />
        </Link>
		<Button  size={"xs"} onClick={Logout}>
			<FiLogOut size={20} />
		</Button>
		</Flex>
      )}
	  {!user && (
				<Link as={RouterLink} to={'/auth'} onClick={
					()=>setAuthScreen("signup")
				}>
					Sign Up
				</Link>
			)}
    </Flex>
  )
}
export default Header;