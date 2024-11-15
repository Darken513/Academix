import express, { NextFunction, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeRouters } from './routers/routersInitializer';
import { DATA_SOURCE } from './db/dataSource';
import { createFakeDB } from './db/fakeDB';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { AppRequest } from './core/AppRequest';
dotenv.config({ path: path.resolve(__dirname, './config/.env.dev') });

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
    this.app.use(this.jwtVerifyMiddleware);
  }

  private initializeRouters(): void {
    initializeRouters(this.app);
  }

  private handleFallback(): void {
    this.app.use((req: AppRequest, res: Response) => {
      res.redirect('/');
    });
  }

  private handleErrors(): void {
    process.on('uncaughtException', (error: Error) => {
      console.error('Error: ', error);
    });
  }

  jwtVerifyMiddleware(req: AppRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (process.env.SKIP_JWT === 'true') {
      req.decodedToken = { id: 1, phone_number: '20202020', role: 'student' };
      return next();
    }
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.decodedToken = decoded;
      next();
    });
  }

  public async start(): Promise<void> {
    try {
      await DATA_SOURCE.initialize();
      createFakeDB().catch(error => console.error(error));

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