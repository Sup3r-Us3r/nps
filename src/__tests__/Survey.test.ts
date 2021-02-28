import request from 'supertest';
import { getConnection } from 'typeorm';
import app from '../app';

import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('Should be able to create survey', async () => {
    const response = await request(app)
      .post('/surveys/create')
      .send({
        title: 'title test',
        description: 'descrition test',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to get all surveys', async () => {
    const response = await request(app)
      .get('/surveys/show');

    expect(response.status).toBe(200);
  });
});
