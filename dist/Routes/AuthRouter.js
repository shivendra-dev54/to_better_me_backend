"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../Controllers/AuthController"));
const AuthRouter = (0, express_1.Router)();
AuthRouter.route("/api/auth/sign_up").post(AuthController_1.default.signUp);
AuthRouter.route("/api/auth/sign_in").post(AuthController_1.default.signIn);
exports.default = AuthRouter;
