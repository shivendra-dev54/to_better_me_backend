import { Router } from "express";
import AuthController from "../Controllers/AuthController";

const AuthRouter = Router();

AuthRouter.route("/api/auth/sign_up").post(AuthController.signUp);

AuthRouter.route("/api/auth/sign_in").post(AuthController.signIn);

export default AuthRouter;