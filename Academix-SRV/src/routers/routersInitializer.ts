import { Application } from 'express';
import { UsersRouter } from './users.router';
import { SubjectsRouter } from './subjects.router';
import { EstablishmentRouter } from './establishment.router';
import { SessionsRouter } from './sessions.router';

export function initializeRouters(app: Application): void {
    const usersRouter = new UsersRouter();
    const subjectsRouter = new SubjectsRouter();
    const establishmentRouter = new EstablishmentRouter();
    const sessionsRouter = new SessionsRouter();

    app.use('/users', usersRouter.router);
    app.use('/subjects', subjectsRouter.router);
    app.use('/establishment', establishmentRouter.router);
    app.use('/sessions', sessionsRouter.router);
}