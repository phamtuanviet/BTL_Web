import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  getUsersBySearch,
  updateUser,
  filterUsers,
  getAllUsersData,
  countUsers,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.get("/filter", filterUsers);
userRouter.get("/get-all-user/:start", getAllUsersData);
userRouter.get("/get-users-by-search", getUsersBySearch);
userRouter.get("/count-users", countUsers);
userRouter.put("/update/:id", updateUser);

export default userRouter;
