import express from "express"
import userAuth from "../middleware/userAuth.js";
import { getUserData, getUsersBySearch, updateUser } from "../controllers/userController.js";
import { getAllUsers } from "../repositories/userRepository.js";

const userRouter = express.Router();

userRouter.get("/data",userAuth,getUserData)
userRouter.get("/get-all-user/:start",getAllUsers)
userRouter.get("/get-users-by-search",getUsersBySearch)
userRouter.put("/update/:id",updateUser)

export default userRouter;