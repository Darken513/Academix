import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeRouters } from './routers/routersInitializer';
import { createTables } from './db/tables';
import { pool } from './db/pool';

class App {
  public app: express.Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.initializeMiddlewares();
    this.initializeRouters();
    this.handleFallback();
    this.handleErrors();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private initializeRouters(): void {
    initializeRouters(this.app, pool); // Pass the pool to the routers
  }

  private handleFallback(): void {
    this.app.use((req: Request, res: Response) => {
      res.redirect('/');
    });
  }

  private handleErrors(): void {
    process.on('uncaughtException', (error: Error) => {
      console.error('Error: ', error);
    });
  }

  public async start(): Promise<void> {
    try {
      await createTables();

      this.app.listen(this.port, () => {
        console.log(`Server started on port ${this.port}`);
      });
    } catch (error) {
      console.error('Error starting the server:', error);
    }
  }
}

const appInstance = new App();
appInstance.start().catch(error => {
  console.error('Error initializing the app:', error);
});
