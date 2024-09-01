import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addState, fetchStates } from "../controllers/stateController.js";

const router = express.Router();

router.post('/add', isAuthenticated, addState);
router.get('/fetch', isAuthenticated, fetchStates);


export default router;

