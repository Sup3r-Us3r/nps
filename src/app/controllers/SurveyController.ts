import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepository';

interface ISurvey {
  id?: number;
  title: string;
  description: string;
  created_at?: Date;
}

class SurveyController {
  async create(req: Request, res: Response) {
    const { title, description } = req.body as ISurvey;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description,
    });

    await surveysRepository.save(survey);

    return res.status(201).json(survey);
}

  async show(req: Request, res: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = await surveysRepository.find();

    return res.json(surveys);
  }
}

export default new SurveyController;
