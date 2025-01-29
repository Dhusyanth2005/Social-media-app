import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom"; // Adjust the import path as needed

const HomePage = () => {
    const user = useRecoilValue(userAtom);
    
    return (
        <Link to={`/${user?.username}`}> {/* Navigate to /username */}
            <Flex w={'full'} justifyContent={'center'}>
                <Button>Visit Profile Page</Button>
            </Flex>
        </Link>
    );
}

export default HomePage;