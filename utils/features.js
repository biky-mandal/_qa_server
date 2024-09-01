import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const cookieOption = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    sameSite: 'none',
    httpOnly: true,
    secure: true
}

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, { dbName: 'QA' })
        .then((data) => {
            console.log(`Connected to MongoDB: ${data.connection.host}`);
        })
        .catch((err) => {
            console.log("Error connecting to MongoDB: ", err);
        });
}

const sendToken = async (res, user, code, msg) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const _user = await User.findById(user._id);

    return res.status(code).cookie('token', token, cookieOption).json({
        success: true,
        message: msg,
        user: _user
    });
}

export { connectDB, sendToken, cookieOption }