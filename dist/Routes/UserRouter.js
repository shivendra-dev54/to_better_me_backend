"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../Controllers/UserController"));
const ValidateToken_1 = __importDefault(require("../Middleware/ValidateToken"));
const UserRouter = (0, express_1.Router)();
UserRouter.route("/api/user/get_current").get(ValidateToken_1.default, UserController_1.default.get_current);
UserRouter.route("/api/user/update_entry").put(ValidateToken_1.default, UserController_1.default.update_entry);
UserRouter.route("/api/user/daily_entry").post(ValidateToken_1.default, UserController_1.default.daily_entry);
UserRouter.route("/api/user/get_all_entries").get(ValidateToken_1.default, UserController_1.default.get_all_entries);
exports.default = UserRouter;
