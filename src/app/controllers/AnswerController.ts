import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';

class AnswerController {
  async execute(req: Request, res: Response) {
    // http://localhost:3333/answer/:value?key=value

    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository
      .findOne({ id: String(u) });

    if (!surveyUser) {
      throw new AppError('Survey does not exists');
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export default new AnswerController;
