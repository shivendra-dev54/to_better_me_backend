import { Router } from "express";
import UserController from "../Controllers/UserController";
import validateTokens from "../Middleware/ValidateToken";

const UserRouter = Router();

UserRouter.route("/api/user/get_current").get(validateTokens, UserController.get_current);

UserRouter.route("/api/user/update_entry/:id").post(validateTokens, UserController.update_entry);

UserRouter.route("/api/user/daily_entry").post(validateTokens, UserController.daily_entry);

UserRouter.route("/api/user/get_all_entries").get(validateTokens, UserController.get_all_entries);

export default UserRouter;