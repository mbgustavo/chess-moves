import http from 'http';
import express from "express";
import  swaggerUi from 'swagger-ui-express';

import { AppRouter } from './routes';
import swaggerDocument from '../swagger.json';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();
    this.express.set('port', process.env.PORT || '4000')
    this.routes();
  }

  private routes(): void {
    this.express.use('/', AppRouter);
    this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

const app = new App().express;

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('App is running on http://localhost:%s in %s mode', app.get('port'), app.get('env'));
});