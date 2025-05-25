"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv").config();
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.log("app is running...");
    console.log(`listening to port ${PORT}`);
});
