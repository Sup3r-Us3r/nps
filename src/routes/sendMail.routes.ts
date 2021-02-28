import { Router } from 'express';
import SendMailController from '../app/controllers/SendMailController';

const sendMailRouter = Router();

sendMailRouter.post('/send', SendMailController.execute);

export default sendMailRouter;
