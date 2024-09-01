import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/features.js';
import userRoutes from './routes/user.routes.js';
import categoryRoutes from './routes/category.routes.js';
import subCategoryRoutes from './routes/subcategory.routes.js';
import countryRoutes from './routes/country.routes.js';
import stateRoutes from './routes/state.routes.js';
import questionRoutes from './routes/question.routes.js';
import { errorMiddleWare } from './middlewares/error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config({ path: './.env' });
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/subcategory', subCategoryRoutes);
app.use('/api/v1/country', countryRoutes);
app.use('/api/v1/state', stateRoutes);
app.use('/api/v1/question', questionRoutes);



app.get("/", (req, res) => {
    res.send("Hello World");
})

// This middleware should be at last to work properly
app.use(errorMiddleWare);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})