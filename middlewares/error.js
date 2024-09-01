const errorMiddleWare = (err, req, res, next) => {
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;

    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

const TryCatch = (passedFunc) => async (req, res, next) => {
    try {
        await passedFunc(req, res, next)
    } catch (error) {
        next(error);
    }
}

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export { errorMiddleWare, TryCatch, ErrorHandler };