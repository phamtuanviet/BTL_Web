import express from "express";
import userAuth from "../middleware/userAuth.js";
import {
  getUserData,
  getUsersBySearch,
  updateUser,
  filterUsers,
  getAllUsersData,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-users-by-search", getUsersBySearch);
userRouter.get("/filter", filterUsers);
userRouter.get("/get-all-user/:start", getAllUsersData);
userRouter.put("/update/:id", updateUser);
userRouter.get("/:id", getUserData);

export default userRouter;
