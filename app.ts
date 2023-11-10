import cors from 'cors';
import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import createError from 'http-errors';
import morgan from 'morgan';

import { CLIENT_URL, PORT } from './config/env.js';
import router from './routes/router.js';

const app: Application = express();

app.set('port', PORT || 8000);
app.use(
  cors({
    origin: CLIENT_URL,
  }),
);
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use(((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'internal error' });
  }
}) as ErrorRequestHandler);

export default app;
