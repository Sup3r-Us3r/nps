import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';
import * as Yup from 'yup';
import AppError from '../../errors/AppError';

interface IUser {
  id?: string;
  name: string;
  email: string;
  created_at?: Date;
}

class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body as IUser;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (error) {
      throw new AppError(error);
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const userAlreadyExists = await usersRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
    });

    await usersRepository.save(user);

    return res.status(201).json(user);
  }
}

export default new UserController;
