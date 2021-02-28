import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import SurveysUsersRepository from '../repositories/SurveysUsersRepository';

class NpsController {
  /**
   * Grades: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
   * Detractors: 0 - 6
   * Passive: 7 - 8
   * Promoters: 9 - 10
   * 
   * Calc: (Nº of promoters - Nº of detractors) / (Nº of respondents) x 100
   */

  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull()),
    });

    const detractors = surveysUsers.filter(
      (survey) => survey.value >= 0 && survey.value <= 6
    ).length;

    const promoters = surveysUsers.filter(
      (survey) => survey.value >= 9 && survey.value <= 10
    ).length;

    const passive = surveysUsers.filter(
      (survey) => survey.value >= 7 && survey.value <= 8
    ).length;

    const totalAnswers = surveysUsers.length;

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    return res.json({
      detractors,
      passive,
      promoters,
      totalAnswers,
      nps: calculate,
    });
  }
}

export default new NpsController;
