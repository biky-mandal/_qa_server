import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { cookieOption, sendToken } from "../utils/features.js";
import { ErrorHandler, TryCatch } from "../middlewares/error.js";

const Register = TryCatch(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const user = await User.create({ name, email, password, role, coins: 0 });
    sendToken(res, user, 201, 'User created!');
})

const Login = TryCatch(async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password!", 404));

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        return next(new ErrorHandler("Invalid Email or Password!", 404));
    } else {
        sendToken(res, user, 200, 'Welcome!');
    }

})

const myProfile = TryCatch(async (req, res, next) => {

    const user = await User.findById(req._id);

    res.status(200).json({
        success: true,
        user: user
    })
})

const Logout = TryCatch(async (req, res, next) => {
    return res.status(200).cookie('token', '', { ...cookieOption, maxAge: 0 }).json({
        success: true,
        message: 'Logout Successfully!',
    });
})

// Admin Route
const AllUsers = TryCatch(async (req, res, next) => {

    const users = await User.find({});

    res.status(200).json({
        success: true,
        users
    })
})

export { Register, Login, myProfile, Logout, AllUsers };