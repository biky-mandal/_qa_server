import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";
import { User } from "../models/user.js";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies['token'];

    if (!token) return next(new ErrorHandler('Unauthorized!', 401));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req._id = decodedData._id;

    next();
}

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req._id);

    if (user.role === 'admin') {
        next();
    } else {
        return next(new ErrorHandler('You are not authorized to access this resource!', 403));
    }
}

export { isAuthenticated, isAdmin }