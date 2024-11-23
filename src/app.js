import express from 'express';
import morgan from 'morgan';
import router from './routes/routes.js';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

export default app;
