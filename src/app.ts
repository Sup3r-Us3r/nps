import 'dotenv/config';

import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import createConnection from './database';

class App {
  constructor() {
    this.database();
    this.middlewares();
  }

  public server = express();

  middlewares() {
    this.server.use(cors());
    this.server.use(express.urlencoded({ extended: false }));
    this.server.use(express.json());
    this.server.use(routes);
  }

  database() {
    createConnection();
  }
}

export default new App().server;
