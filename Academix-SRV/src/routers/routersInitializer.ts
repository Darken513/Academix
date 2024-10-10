import { Application } from 'express';
import { UsersRouter } from './users.router';
import { SubjectsRouter } from './subjects.router';
import { EstablishmentRouter } from './establishments.router';
import { SessionsRouter } from './sessions.router';
import { CoursRouter } from './courses.router';
import { StudentsPaymentRouter } from './studentsPayments.router';
import { TeacherPaymentsRouter} from './teacherPayments.router';
import { RoomsRouter} from './rooms.router';

export function initializeRouters(app: Application): void {
    const usersRouter = new UsersRouter();
    const subjectsRouter = new SubjectsRouter();
    const establishmentRouter = new EstablishmentRouter();
    const sessionsRouter = new SessionsRouter();
    const coursesRouter = new CoursRouter();
    const StudentsPaymentsRouter = new StudentsPaymentRouter();
    const teacherPaymentsRouter = new TeacherPaymentsRouter();
    const roomsRouter = new RoomsRouter();

    app.use('/users', usersRouter.router);
    app.use('/subjects', subjectsRouter.router);
    app.use('/establishments', establishmentRouter.router);
    app.use('/sessions', sessionsRouter.router);
    app.use('/courses', coursesRouter.router);
    app.use('/studentsPayments', StudentsPaymentsRouter.router);
    app.use('/teacherPayments', teacherPaymentsRouter.router);
    app.use('/rooms', roomsRouter.router);
}