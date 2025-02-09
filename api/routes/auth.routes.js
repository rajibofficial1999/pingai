import express from "express";
import {
  SignUp,
  SignIn,
  createGoogleUser,
  SignOut,
} from "../controllers/auth.controller.js";

const AuthRouter = express.Router();

AuthRouter.post("/sign-up", SignUp);
AuthRouter.post("/sign-in", SignIn);
AuthRouter.post("/google-sign-in", createGoogleUser);
AuthRouter.post("/sign-out", SignOut);

export default AuthRouter;
