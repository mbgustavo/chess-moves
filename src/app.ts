import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import { AppRouter } from './routes';
import swaggerDocument from './swagger.json';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.express.set('port', process.env.PORT || '4000')
    this.routes();
  }

  private routes(): void {
    this.express.use(cors());
    this.express.use('/', AppRouter);
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new App().express;