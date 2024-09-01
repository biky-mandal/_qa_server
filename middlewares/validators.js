import { check, validationResult } from "express-validator";

const validateRegister = [
    check('name')
        .notEmpty()
        .isLength({ min: 3, max: 100 })
        .withMessage('Name is not Valid!'),

    check('email')
        .isEmail()
        .withMessage('Email is not Valid!'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password is not Valid!')
]

const validateLogin = [

    check('email')
        .isEmail()
        .withMessage('Email is not Valid!'),

    check('password')
        .isLength({ min: 6 })
        .withMessage('Password is not Valid!')
]

const is_Request_Validated = (req, res, next) => {
    console.log(req.body)
    // This will return all the erros while validation and it is provided
    // By express-validator
    const errors = validationResult(req); // store all errors to validationResult method

    if (errors.array().length > 0) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
    }

    // If there is no error then simply run next function
    next();
}

export { validateRegister, validateLogin, is_Request_Validated }