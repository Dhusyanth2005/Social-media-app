import express from 'express'
import {signupUser,loginUser,getUserProfile,updateUser, logoutUser,followUnFollowUser,getSuggestedUsers} from '../controllers/userController.js'
import protectRoute from "../middlewares/protectRoute.js";
const router = express.Router();
router.get("/profile/:query", getUserProfile);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post('/signup',signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followUnFollowUser);
router.put("/update/:id", protectRoute, updateUser);


export default router;