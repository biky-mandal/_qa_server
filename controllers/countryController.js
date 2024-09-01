import { TryCatch } from "../middlewares/error.js";
import { Country } from "../models/country.js";

const addCountry = TryCatch(async (req, res, next) => {
    const { name, code } = req.body;
    const _country = await Country.create({ name, code });

    res.status(201).json({
        success: true,
        message: "Country Added!",
        country: _country
    })
})

const fetchCountries = TryCatch(async (req, res, next) => {

    const { name, code } = req.query;
    let _countries = null;

    if (name) { // User will get single Category based on Query
        _countries = await Country.findOne({ name })
    } else if (code) { // Otherwise all categories
        _countries = await Country.findOne({ code });
    } else { // Otherwise all categories
        _countries = await Country.find({});
    }

    res.status(200).json({
        success: true,
        countries: _countries
    })
})

export { addCountry, fetchCountries }