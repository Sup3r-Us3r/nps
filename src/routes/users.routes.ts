import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const userRouter = Router();

userRouter.post('/create', UserController.create);

export default userRouter;
