import { useRecoilValue } from "recoil";
import LoginCard from "../components/loginCard";
import SignupCard from "../components/signupCard";
import authScreenAtom from "../atoms/authAtom.js";

const AuthPage = () => {
    
	const authScreenState = useRecoilValue(authScreenAtom);
	

	return <>{authScreenState === "login" ? <LoginCard /> : <SignupCard />}</>;
};

export default AuthPage;
