import { Router } from 'express';
import userRouter from './users.routes';
import surveyRouter from './surveys.routes';
import sendMailRouter from './sendMail.routes';
import answerRouter from './answer.routes';
import npsRouter from './nps.routes';
import ErrorMiddleware from '../app/middlewares/ErrorMiddleware';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/surveys', surveyRouter);
routes.use('/mail', sendMailRouter);
routes.use('/answers', answerRouter);
routes.use('/nps', npsRouter);

routes.use(ErrorMiddleware);

export default routes;
