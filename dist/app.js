"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AuthRouter_1 = __importDefault(require("./Routes/AuthRouter"));
const UserRouter_1 = __importDefault(require("./Routes/UserRouter"));
const dbConnect_1 = __importDefault(require("./Config/dbConnect"));
const app = (0, express_1.default)();
(0, dbConnect_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(AuthRouter_1.default);
app.use(UserRouter_1.default);
exports.default = app;
