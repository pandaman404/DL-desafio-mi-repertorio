import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/', router);
app.use(errorHandler);

export default app;
