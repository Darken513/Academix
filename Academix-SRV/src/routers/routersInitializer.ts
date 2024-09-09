import { Application } from 'express';
import { Pool } from 'pg';
import { UsersRouter } from './users.router';
import { SubjectsRouter } from './subjects.router';

export function initializeRouters(app: Application, db: Pool): void {
    const usersRouter = new UsersRouter(db);
    const subjectsRouter = new SubjectsRouter(db);

    app.use('/users', usersRouter.router);
    app.use('/subjects', subjectsRouter.router);
}