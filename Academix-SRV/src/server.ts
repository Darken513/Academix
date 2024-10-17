import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeRouters } from './routers/routersInitializer';
import { DATA_SOURCE } from './db/dataSource';
import { Teacher } from './models/userRoles/Teacher';
import { Student } from './models/userRoles/Student';

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
    initializeRouters(this.app);
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
      await DATA_SOURCE.initialize();

      this.app.listen(this.port, () => {
        console.log(`Server started on port ${this.port}`);

        async function createTeacher() {
          // Get the repository for the Teacher entity
          const teacherRepository = DATA_SOURCE.getRepository(Teacher);

          // Create a new Teacher instance
          let test = {
            email: 'teacher@example.com',
            first_name: 'John',
            last_name: 'Doe',
            password: 'securepassword',  // Remember to hash the password in a real scenario
            enabled: true,
            subject: 'Mathematics',  // Teacher-specific field
          }
          const newTeacher = teacherRepository.create(test);

          // Save the new teacher to the database
          await teacherRepository.save(newTeacher);

          console.log('New teacher created:', newTeacher);
        }

        async function createStudent() {
          const studentRepository = DATA_SOURCE.getRepository(Student);

          let test = {
            email: 'student@example.com',
            first_name: 'Nejma',
            last_name: 'Triple N',
            password: 'securepassword',  
            enabled: true,
          }
          const newTeacher = studentRepository.create(test);

          // Save the new student to the database
          await studentRepository.save(newTeacher);

          console.log('New student created:', newTeacher);
        }
        createStudent();
        createTeacher();
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