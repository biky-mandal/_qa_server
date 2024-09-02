import express from 'express';
import { validateRegister, validateLogin, is_Request_Validated } from '../middlewares/validators.js';
import { Register, Login, myProfile, Logout, AllUsers } from '../controllers/userController.js';
import { isAdmin, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/register', validateRegister, is_Request_Validated, Register);
router.post('/login', validateLogin, is_Request_Validated, Login);


// After this all to access all the routes user needs to be login

router.get('/me', isAuthenticated, myProfile);
router.get('/logout', isAuthenticated, Logout);

// Admin Routes
router.get('/admin/users', isAuthenticated, isAdmin, AllUsers);

export default router;