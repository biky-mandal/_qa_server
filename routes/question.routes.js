import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createQuestion, fetchallQuestions, filterQuestions, fetchAnswerWithQId } from "../controllers/questionController.js";

const router = express.Router();

router.post('/create', isAuthenticated, createQuestion);
router.get('/fetch', isAuthenticated, fetchallQuestions);
router.post('/fetch/filtered', isAuthenticated, filterQuestions);


router.get('/ans', isAuthenticated, fetchAnswerWithQId);



export default router;

