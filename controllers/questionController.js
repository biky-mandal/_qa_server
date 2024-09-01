import { ErrorHandler, TryCatch } from "../middlewares/error.js";
import { Question } from "../models/question.js";
import { Answer } from "../models/answer.js";

const createQuestion = TryCatch(async (req, res, next) => {
    const { value, options, eventDate, countries,
        states, categories, subCategories, createdBy, updatedBy, key, description,
    } = req.body;

    const _question = await Question.create({
        value, options, eventDate, countries,
        states, categories, subCategories, createdBy, updatedBy
    });

    if (_question) {
        await Answer.create({
            question: _question._id,
            key,
            description,
            createdBy,
            updatedBy
        })
    }

    res.status(201).json({
        success: true,
        message: "Question Created!",
    })
})

const fetchallQuestions = TryCatch(async (req, res, next) => {
    let _questions;
    const { createdBy } = req.query;
    if (createdBy) {
        _questions = await Question.find({ createdBy });
    } else {
        _questions = await Question.find({});
    }
    if (!_questions) {
        return next(new ErrorHandler("No Question Found", 404));
    }
    res.status(200).json({
        success: true,
        questions: _questions
    })
})

const filterQuestions = TryCatch(async (req, res, next) => {
    const { startDate, endDate, countries, states, categories, subCategories } = req.body;

    const _questions = await Question.find({}).where(countries).all(countries);

    res.status(200).json({
        success: true,
        questions: _questions
    })
})

const fetchAnswerWithQId = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    const _answer = await Answer.findOne({ question: id });

    if (!_answer) {
        return next(new ErrorHandler("No Answer Found", 404));
    }
    res.status(200).json({
        success: true,
        answer: _answer
    })
})

export { createQuestion, fetchallQuestions, filterQuestions, fetchAnswerWithQId }