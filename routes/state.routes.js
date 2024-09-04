import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { addState, fetchStates } from "../controllers/stateController.js";

const router = express.Router();

router.post('/add', isAuthenticated, addState);
router.get('/fetch', isAuthenticated, fetchStates);

// Admin Route
router.post('/admin/add', isAuthenticated, isAdmin, addState);


export default router;

