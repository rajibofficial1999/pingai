import express from "express";
import { getUser } from "../controllers/user.controller.js";

const UserRouter = express.Router();

UserRouter.get("/user", getUser);

export default UserRouter;
