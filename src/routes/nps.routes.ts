import { Router } from 'express';
import NpsController from '../app/controllers/NpsController';

const npsRouter = Router();

npsRouter.get('/:survey_id', NpsController.execute);

export default npsRouter;
