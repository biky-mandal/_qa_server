import { TryCatch } from "../middlewares/error.js";
import { State } from "../models/state.js";

const addState = TryCatch(async (req, res, next) => {
    const { name, code, country } = req.body;
    const _state = await State.create({ name, code, country });

    res.status(201).json({
        success: true,
        message: "State Added!",
        state: _state
    })
})

const fetchStates = TryCatch(async (req, res, next) => {

    const { name, code, country } = req.query;
    let _states = null;

    if (name) { // User will get single state based on Query
        _states = await State.findOne({ name })
    } else if (code) { // User will get single state based on Query
        _states = await State.findOne({ code })
    } else if (country) {
        _states = await State.find({ country })
    } else { // Otherwise all state
        _states = await State.find({});
    }

    res.status(200).json({
        success: true,
        states: _states
    })
})

export { addState, fetchStates }