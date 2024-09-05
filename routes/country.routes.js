import express from "express";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { addCountry, countriesWithStates, fetchCountries } from "../controllers/countryController.js";

const router = express.Router();

router.get('/fetch', isAuthenticated, fetchCountries);
router.get('/countries', isAuthenticated, countriesWithStates);

// admin Routes
router.post('/admin/add', isAuthenticated, isAdmin, addCountry);


export default router;

