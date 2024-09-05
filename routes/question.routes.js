import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { createQuestion, fetchallQuestions, filterQuestions, fetchAnswerWithQId, fetchallQuestionsAns, fetchQAByUser } from "../controllers/questionController.js";

const router = express.Router();

router.post('/create', isAuthenticated, createQuestion);
router.get('/fetch', isAuthenticated, fetchallQuestions);
router.post('/fetch/filtered', isAuthenticated, filterQuestions);


router.get('/ans', isAuthenticated, fetchAnswerWithQId);
router.get('/fetchAllWithAns', isAuthenticated, fetchallQuestionsAns);

// fetch by User id
router.get('/fetchQA', isAuthenticated, fetchQAByUser);



export default router;

