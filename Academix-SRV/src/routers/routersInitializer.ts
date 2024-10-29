import { Application } from 'express';
import { UsersRouter } from './users.router';
import { SubjectsRouter } from './subjects.router';
import { EstablishmentRouter } from './establishments.router';
import { SessionsRouter } from './sessions.router';
import { CoursRouter } from './courses.router';
import { StudentsPaymentRouter } from './studentsPayments.router';
import { TeacherPaymentsRouter } from './teacherPayments.router';
import { RoomsRouter } from './rooms.router';
import { AttendanceRouter } from './attendance.router';
import { TeachersSubjectsRouter } from './teachersSubjects.router';
import { CoursStudentRouter } from './coursStudent.router';
import { TeachersRouter } from './teachers.router';
import { ParentsRouter } from './parents.router';
import { AdminsRouter } from './admins.router';
import { StudentsRouter } from './students.router';

export function initializeRouters(app: Application): void {
    const usersRouter = new UsersRouter();
    const teachersRouter = new TeachersRouter();
    const parentsRouter = new ParentsRouter();
    const adminsRouter = new AdminsRouter();
    const studentsRouter = new StudentsRouter();
    const subjectsRouter = new SubjectsRouter();
    const establishmentRouter = new EstablishmentRouter();
    const sessionsRouter = new SessionsRouter();
    const coursesRouter = new CoursRouter();
    const StudentsPaymentsRouter = new StudentsPaymentRouter();
    const teacherPaymentsRouter = new TeacherPaymentsRouter();
    const roomsRouter = new RoomsRouter();
    const attendanceRouter = new AttendanceRouter();
    const teachersSubjectsRouter = new TeachersSubjectsRouter();
    const coursStudentRouter = new CoursStudentRouter();

    app.use('/users', usersRouter.router);
    app.use('/teachers', teachersRouter.router);
    app.use('/parents', parentsRouter.router);
    app.use('/admins', adminsRouter.router);
    app.use('/students', studentsRouter.router);
    app.use('/subjects', subjectsRouter.router);
    app.use('/establishments', establishmentRouter.router);
    app.use('/sessions', sessionsRouter.router);
    app.use('/courses', coursesRouter.router);
    app.use('/studentPayments', StudentsPaymentsRouter.router);
    app.use('/teacherPayments', teacherPaymentsRouter.router);
    app.use('/rooms', roomsRouter.router);
    app.use('/attendances', attendanceRouter.router);
    app.use('/teachersSubjects', teachersSubjectsRouter.router);
    app.use('/coursStudents', coursStudentRouter.router);
}