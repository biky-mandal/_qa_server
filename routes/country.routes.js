import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addCountry, fetchCountries } from "../controllers/countryController.js";

const router = express.Router();

router.post('/add', isAuthenticated, addCountry);
router.get('/fetch', isAuthenticated, fetchCountries);


export default router;

