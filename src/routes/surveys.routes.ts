import { Router } from 'express';
import SurveyController from '../app/controllers/SurveyController';

const surveyRouter = Router();

surveyRouter.get('/show', SurveyController.show);
surveyRouter.post('/create', SurveyController.create);

export default surveyRouter;
