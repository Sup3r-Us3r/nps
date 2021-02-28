import { Router } from 'express';
import AnswerController from '../app/controllers/AnswerController';

const answerRouter = Router();

answerRouter.get('/:value', AnswerController.execute);

export default answerRouter;
