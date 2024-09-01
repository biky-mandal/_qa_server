import jwt from "jsonwebtoken";
import { ErrorHandler } from "./error.js";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies['token'];

    if (!token) return next(new ErrorHandler('Unauthorized!', 401));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req._id = decodedData._id;

    next();
}

export { isAuthenticated }