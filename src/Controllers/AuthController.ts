import asyncHandler from "express-async-handler"
import UserSchema from "../Models/UserModel";
import jwt from "jsonwebtoken";
import bcrypt = require("bcryptjs")
import { Request } from "express";

//@desc POST create new user
//@route /api/auth/sign_up
//@access public
const signUp = asyncHandler(async (_req: Request, res) => {

    const {username, email, password} = _req.body;

    if (!username || !email || !password){
        res.status(400).json({
            "Error": "All fields are mandatory."
        });
        return;
    }

    const userWithSameName = await UserSchema.findOne({username});
    const userWithSameEmail = await UserSchema.findOne({email});

    if (userWithSameEmail){
        res.status(400).json({
            "Error": "This email already exist"
        });
        return;
    }

    if (userWithSameName){
        res.status(400).json({
            "Error": "This name already exist"
        });
        return;
    }


    const hashedPassword = await bcrypt.hash(password, 5);

    const user = new UserSchema({
        username,
        email,
        password: hashedPassword,
        isSpecial: false
    });

    await user.save();


    res.status(201).json({
        user
    })
});




//@desc POST sign in to your account
//@route /api/auth/sign_in
//@access public
const signIn = asyncHandler(async (_req, res) => {

    const {email, password} = _req.body;

    if(!email || !password){
        res.status(400).json({
            "error": "all fields are mandatory"
        });
        return;
    }

    //if user does not exist
    const user = await UserSchema.findOne({ email });
    if (!user) {
        res.status(400).json({
            error: "User with this email does not exist"
        });
        return;
    }

    const passCorrect = await bcrypt.compare(password, String(user.password));
    if (!passCorrect) {
        res.status(400).json({
            error: "Password you entered is incorrect"
        });
        return;
    }

    const token = jwt.sign({
        username: user.username,
        email: user.email,
        passwoprd: user.password,
    },
    process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1h',
    });

    res.status(200).json({
        username: user.username,
        email: user.email,
        token
    });
});



export default {
    signUp,
    signIn,
};