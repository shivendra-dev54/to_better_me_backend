"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcryptjs");
//@desc POST create new user
//@route /api/auth/sign_up
//@access public
const signUp = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = _req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            "Error": "All fields are mandatory."
        });
        return;
    }
    const userWithSameName = yield UserModel_1.default.findOne({ username });
    const userWithSameEmail = yield UserModel_1.default.findOne({ email });
    if (userWithSameEmail) {
        res.status(400).json({
            "Error": "This email already exist"
        });
        return;
    }
    if (userWithSameName) {
        res.status(400).json({
            "Error": "This name already exist"
        });
        return;
    }
    const hashedPassword = yield bcrypt.hash(password, 5);
    const user = new UserModel_1.default({
        username,
        email,
        password: hashedPassword,
        isSpecial: false
    });
    yield user.save();
    res.status(201).json({
        user
    });
}));
//@desc POST sign in to your account
//@route /api/auth/sign_in
//@access public
const signIn = (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = _req.body;
    if (!email || !password) {
        res.status(400).json({
            "error": "all fields are mandatory"
        });
        return;
    }
    //if user does not exist
    const user = yield UserModel_1.default.findOne({ email });
    if (!user) {
        res.status(400).json({
            error: "User with this email does not exist"
        });
        return;
    }
    const passCorrect = yield bcrypt.compare(password, String(user.password));
    if (!passCorrect) {
        res.status(400).json({
            error: "Password you entered is incorrect"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        username: user.username,
        email: user.email,
        passwoprd: user.password,
    }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h',
    });
    res.status(200).json({
        username: user.username,
        email: user.email,
        token
    });
}));
exports.default = {
    signUp,
    signIn,
};
