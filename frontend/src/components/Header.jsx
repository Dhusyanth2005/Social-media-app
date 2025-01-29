import { Image, Flex,useColorMode } from "@chakra-ui/react"

const Header= ()=> {
    const {colorMode, toggleColorMode} = useColorMode()
  return <Flex justifyContent={"center"} mt={6} mb="12">
    <Image  alt="logo"
     cursor={"pointer"}
     src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"} 
     w={6}
     onClick={toggleColorMode}/>
  </Flex>
}
export default Header;