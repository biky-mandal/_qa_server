import { ErrorHandler, TryCatch } from "../middlewares/error.js";
import { Question } from "../models/question.js";
import { User } from "../models/user.js";
import { Answer } from "../models/answer.js";

const createQuestion = TryCatch(async (req, res, next) => {
    const { value, options, eventDate, countries,
        states, categories, subCategories, createdBy, updatedBy, key, description,
    } = req.body;

    const _user = await User.findById(createdBy);
    const _coins = _user.coins + 5;

    await User.findByIdAndUpdate(createdBy, { coins: _coins });

    const _ans = await Answer.create({
        key,
        description,
        createdBy,
        updatedBy
    })

    if (_ans) {
        await Question.create({
            value, answer: _ans._id, options, eventDate, countries,
            states, categories, subCategories, createdBy, updatedBy
        });
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

const fetchallQuestionsAns = TryCatch(async (req, res, next) => {
    let _questions = await Question.find().populate(['countries', 'answer', 'states', 'categories', 'subCategories', 'createdBy', 'updatedBy']);

    if (!_questions) {
        return next(new ErrorHandler("No Question Found", 404));
    }
    res.status(200).json({
        success: true,
        questions: _questions
    })
})

const fetchQAByUser = TryCatch(async (req, res, next) => {
    const createdBy = req.query.createdBy; // Extract 'createdBy' from query parameters

    if (!createdBy) {
        return next(new ErrorHandler("CreatedBy parameter is required", 400)); // Handle missing parameter case
    }

    let questions = await Question.find({ createdBy }).populate([
        'countries', 'answer', 'states', 'categories', 'subCategories', 'createdBy', 'updatedBy'
    ]);

    res.status(200).json({
        success: true,
        questions
    });
});

export { createQuestion, fetchallQuestions, filterQuestions, fetchAnswerWithQId, fetchallQuestionsAns, fetchQAByUser }