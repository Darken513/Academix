import { Cours } from '../models/Cours';
import { Establishment } from '../models/Establishment';
import { Room } from '../models/Room';
import { TeacherPayment } from '../models/TeacherPayment';
import { Teacher } from '../models/userRoles/Teacher';
import { DATA_SOURCE } from './dataSource';
import { Student } from '../models/userRoles/Student';
import { Subject } from '../models/Subject';
import { Parent } from '../models/userRoles/Parent';
import { Session } from '../models/Session';
import { Attendance } from '../models/Attendance';
import { CoursStudent } from '../models/CoursStudent';
import { StudentPayment } from '../models/StudentPayment';
import { PaymentMode } from '../models/PaymentMode';
import { WalletPayments } from '../models/walletPayment';

async function createRooms(numberOfRooms: number) {
    const roomRepository = DATA_SOURCE.getRepository(Room);
    const roomsList = [];

    for (let i = 1; i <= numberOfRooms; i++) {
        // Check if room with ID i already exists
        let savedRoom = await roomRepository.findOneBy({ id: i });

        if (!savedRoom) {
            // Create a new room if not found
            const newRoom = roomRepository.create({
                name: `Room ${i}`,
                capacity: 20 + i * 5, // Example capacity increment
                enabled: true,
            });
            savedRoom = await roomRepository.save(newRoom);
        }

        // Add the saved or found room to the list
        roomsList.push(savedRoom);
    }

    return roomsList; // This list can now be used in another function
}

async function createEstablishments(numberOfEstablishments: number) {
    const establishmentRepository = DATA_SOURCE.getRepository(Establishment);
    const establishmentsList = [];

    for (let i = 1; i <= numberOfEstablishments; i++) {
        // Check if establishment with ID i already exists
        let savedEstablishment = await establishmentRepository.findOneBy({ id: i });

        if (!savedEstablishment) {
            // Create a new establishment if not found
            const newEstablishment = establishmentRepository.create({
                name: `Establishment ${i}`,
                description: `Description for Establishment ${i}`,
                enabled: true,
            });
            savedEstablishment = await establishmentRepository.save(newEstablishment);
        }

        // Add the saved or found establishment to the list
        establishmentsList.push(savedEstablishment);
    }

    return establishmentsList; // This list can now be used in another function
}

async function createSubjects(numberOfSubjects: number) {
    const subjectRepository = DATA_SOURCE.getRepository(Subject);
    const subjectsList = [];

    for (let i = 1; i <= numberOfSubjects; i++) {
        // Check if a subject with ID i already exists
        let savedSubject = await subjectRepository.findOneBy({ id: i });

        if (!savedSubject) {
            // Create a new subject if not found
            const newSubject = subjectRepository.create({
                name: `Subject ${i}`,
                description: `Description for Subject ${i}`,
                enabled: true,
            });
            savedSubject = await subjectRepository.save(newSubject);
        }

        // Add the saved or found subject to the list
        subjectsList.push(savedSubject);
    }

    return subjectsList; // This list can now be used in another function
}

async function createTeachers(numberOfTeachers: number, establishmentsList: Establishment[]) {
    const teacherRepository = DATA_SOURCE.getRepository(Teacher);
    const teachersList = [];

    for (let i = 1; i <= numberOfTeachers; i++) {
        // Generate random establishment from the provided list
        const randomEstablishment = establishmentsList[Math.floor(Math.random() * establishmentsList.length)];

        // Check if teacher with this name already exists
        let savedTeacher = await teacherRepository.findOneBy({ id: i });

        if (!savedTeacher) {
            // Create a new teacher if not found
            const newTeacher = teacherRepository.create({
                first_name: `TeacherFirstName${i}`,
                last_name: `TeacherLastName${i}`,
                phone_number: `+1234567890${i}`, // Placeholder phone number
                password: `SecurePassword${i}`, // Placeholder password
                note: `Note for Teacher ${i}`,
                imgURL: `https://example.com/teacher${i}.jpg`,
                enabled: true,
                role: "teacher",
                establishment: randomEstablishment, // Assign random establishment
            });
            savedTeacher = await teacherRepository.save(newTeacher);
        }
        teachersList.push(savedTeacher);
    }

    return teachersList;
}

async function createParents(numberOfParents: number) {
    const parentRepository = DATA_SOURCE.getRepository(Parent);
    const parentsList = [];

    for (let i = 1; i <= numberOfParents; i++) {
        // Check if a parent with this first name and last name already exists
        let savedParent = await parentRepository.findOneBy({ id: i });
        if (!savedParent) {
            // Create a new parent if not found
            const newParent = parentRepository.create({
                first_name: `ParentFirstName${i}`,
                last_name: `ParentLastName${i}`,
                phone_number: `+1234567890${i}`, // Placeholder phone number
                password: `SecurePassword${i}`,  // Placeholder password
                note: `Note for Parent ${i}`,
                imgURL: `https://example.com/parent${i}.jpg`,
                enabled: true,
                role: "parent",  // Assign "parent" role
            });
            savedParent = await parentRepository.save(newParent);
        }
        parentsList.push(savedParent);
    }

    return parentsList;
}

async function createStudents(
    numberOfStudents: number,
    establishmentsList: Establishment[],
    parentsList: Parent[]
) {
    const studentRepository = DATA_SOURCE.getRepository(Student);
    const studentsList = [];

    for (let i = 1; i <= numberOfStudents; i++) {
        // Select a random establishment and parent from the lists
        const randomEstablishment = establishmentsList[Math.floor(Math.random() * establishmentsList.length)];
        const randomParent = parentsList[Math.floor(Math.random() * parentsList.length)];

        // Check if a student with this first name and last name already exists
        let savedStudent = await studentRepository.findOneBy({
            first_name: `StudentFirstName${i}`,
            last_name: `StudentLastName${i}`,
            role: "student",
        });
        
        if (!savedStudent) {
            // Create a new student if not found
            const newStudent = studentRepository.create({
                first_name: `StudentFirstName${i}`,
                last_name: `StudentLastName${i}`,
                phone_number: `+1234567890${i}`, // Placeholder phone number
                password: `SecurePassword${i}`,  // Placeholder password
                note: `Note for Student ${i}`,
                imgURL: `https://example.com/student${i}.jpg`,
                walletBalance: 0.0, // Set walletBalance to null
                enabled: true,
                role: "student",  // Assign "student" role
                establishment: randomEstablishment, // Assign random establishment
                parent: randomParent // Assign random parent
            });
            savedStudent = await studentRepository.save(newStudent);
        }
        studentsList.push(savedStudent);
    }

    return studentsList;
}

async function createCourses(
    numberOfCourses: number,
    teachersList: Teacher[],
    subjectsList: Subject[]
) {
    const courseRepository = DATA_SOURCE.getRepository(Cours);
    const coursesList = [];

    for (let i = 1; i <= numberOfCourses; i++) {
        // Select a random teacher and subject from the lists
        const randomTeacher = teachersList[Math.floor(Math.random() * teachersList.length)];
        const randomSubject = subjectsList[Math.floor(Math.random() * subjectsList.length)];

        // Check if a course with this teacher and subject already exists
        let savedCourse = await courseRepository.findOneBy({
            teacher: { id: randomTeacher.id },
            subject: { id: randomSubject.id }
        });

        if (!savedCourse) {
            // Create a new course if not found
            const newCourse = courseRepository.create({
                enabled: true,
                last_update: new Date(),
                teacher: randomTeacher,  // Assign random teacher
                subject: randomSubject   // Assign random subject
            });
            savedCourse = await courseRepository.save(newCourse);
        }

        coursesList.push(savedCourse);
    }

    return coursesList;
}

async function createSessions(
    numberOfSessions: number,
    roomsList: Room[],
    coursesList: Cours[]
) {
    const sessionRepository = DATA_SOURCE.getRepository(Session);
    const sessionsList = [];

    for (let i = 1; i <= numberOfSessions; i++) {
        // Select a random room and course from the lists
        const randomRoom = roomsList[Math.floor(Math.random() * roomsList.length)];
        const randomCourse = coursesList[Math.floor(Math.random() * coursesList.length)];

        // Create a new session
        const newSession = sessionRepository.create({
            session_date: new Date(), // Set the session date to today (or any specific date)
            start_time: new Date(new Date().setHours(new Date().getHours() + i)), // Start time incremented by i hours
            end_time: new Date(new Date().setHours(new Date().getHours() + i + 1)), // End time one hour after start time
            enabled: true,
            room: randomRoom,  // Assign random room
            cours: randomCourse, // Assign random course
            last_update: new Date(),
        });

        const savedSession = await sessionRepository.save(newSession);
        sessionsList.push(savedSession);
    }

    return sessionsList;
}

async function createAttendances(
    numberOfAttendances: number,
    sessionsList: Session[],
    studentsList: Student[]
) {
    const attendanceRepository = DATA_SOURCE.getRepository(Attendance);
    const attendancesList = [];

    for (let i = 0; i < numberOfAttendances; i++) {
        // Select a random session and student from the lists
        const randomSession = sessionsList[Math.floor(Math.random() * sessionsList.length)];
        const randomStudent = studentsList[Math.floor(Math.random() * studentsList.length)];

        // Create a new attendance record
        const newAttendance = attendanceRepository.create({
            status: 'Present', // Default status; can be changed to 'Absent' as needed
            notes: `Attendance recorded for ${randomStudent.first_name} ${randomStudent.last_name} for session on ${randomSession.session_date}`,
            enabled: true,
            session: randomSession, // Assign random session
            student: randomStudent, // Assign random student
            last_update: new Date(),
        });

        const savedAttendance = await attendanceRepository.save(newAttendance);
        attendancesList.push(savedAttendance);
    }

    return attendancesList;
}

async function createTeacherPayments(
    numberOfPayments: number,
    teachersList: Teacher[],
    coursesList: Cours[]
) {
    const teacherPaymentRepository = DATA_SOURCE.getRepository(TeacherPayment);
    const teacherPaymentsList = [];

    for (let i = 0; i < numberOfPayments; i++) {
        // Select a random teacher and a random course from the lists
        const randomTeacher = teachersList[Math.floor(Math.random() * teachersList.length)];
        const randomCourse = coursesList[Math.floor(Math.random() * coursesList.length)];

        // Check if a payment already exists for this teacher and course
        const existingPayment = await teacherPaymentRepository.findOne({
            where: { teacher: { id: randomTeacher.id }, cours: { id: randomCourse.id } },
        });

        if (!existingPayment) {
            // Create a new teacher payment if it doesn't already exist
            const newTeacherPayment = teacherPaymentRepository.create({
                amount: Math.floor(Math.random() * 1000) + 100, // Random payment amount
                fromWallet: Math.random() < 0.5, // Random boolean for 'fromWallet'
                paid_at: new Date(),
                cours: randomCourse,        // Assign random course
                teacher: randomTeacher,     // Assign random teacher
            });

            const savedTeacherPayment = await teacherPaymentRepository.save(newTeacherPayment);
            teacherPaymentsList.push(savedTeacherPayment);
        } else {
            // Optionally log or handle the case when the payment already exists
            console.log(`Payment already exists for Teacher ID ${randomTeacher.id} and Course ID ${randomCourse.id}`);
        }
    }

    return teacherPaymentsList;
}

async function createCoursesStudents(
    numberOfCoursStudents: number,
    studentsList: Student[],
    coursesList: Cours[]
) {
    const coursStudentRepository = DATA_SOURCE.getRepository(CoursStudent);
    const coursStudentsList = [];

    for (let i = 0; i < numberOfCoursStudents; i++) {
        // Select a random student and a random course
        const randomStudent = studentsList[Math.floor(Math.random() * studentsList.length)];
        const randomCourse = coursesList[Math.floor(Math.random() * coursesList.length)];

        // Check if a CoursStudent entry already exists for this student and course
        const existingCoursStudent = await coursStudentRepository.findOne({
            where: { student: { id: randomStudent.id }, cours: { id: randomCourse.id } },
        });

        if (!existingCoursStudent) {
            // Create a new CoursStudent entry if it doesn't already exist
            const newCoursStudent = coursStudentRepository.create({
                student: randomStudent,
                cours: randomCourse,
                unpaid_sessions_count: Math.floor(Math.random() * 5), // Random unpaid session count
                refered: Math.random() < 0.5, // Random boolean for 'refered'
                enabled: true,
            });

            const savedCoursStudent = await coursStudentRepository.save(newCoursStudent);
            coursStudentsList.push(savedCoursStudent);
        } else {
            // Optionally log or handle if the record already exists
            console.log(`CoursStudent already exists for Student ID ${randomStudent.id} and Course ID ${randomCourse.id}`);
        }
    }

    return coursStudentsList;
}

async function createStudentPayments(
    numberOfPayments: number,
    coursStudentsList: CoursStudent[]
) {
    const studentPaymentRepository = DATA_SOURCE.getRepository(StudentPayment);
    const studentPaymentsList = [];

    for (let i = 0; i < numberOfPayments; i++) {
        // Select a random CoursStudent
        const randomCoursStudent = coursStudentsList[Math.floor(Math.random() * coursStudentsList.length)];

        // Create a new StudentPayment with a random CoursStudent
        const newStudentPayment = studentPaymentRepository.create({
            amount: Math.floor(Math.random() * 1000) + 100, // Random amount between 100 and 1100
            fromWallet: Math.random() < 0.5, // Random boolean for 'fromWallet'
            paid_at: new Date(),
            coursStudent: randomCoursStudent,
        });

        const savedStudentPayment = await studentPaymentRepository.save(newStudentPayment);
        studentPaymentsList.push(savedStudentPayment);
    }

    return studentPaymentsList;
}

async function createPaymentModesForCourses(coursesList: Cours[]) {
    const paymentModeRepository = DATA_SOURCE.getRepository(PaymentMode);
    const paymentModesList = [];

    for (const cours of coursesList) {
        // Create a new PaymentMode with random or predefined values
        const newPaymentMode = paymentModeRepository.create({
            managed_by_center: Math.random() < 0.5, // Random boolean for 'managed_by_center'
            studentPaymentType: `Type${Math.floor(Math.random() * 3) + 1}`, // Example student payment type
            student_price_per_session: Math.floor(Math.random() * 500) + 100, // Random price per session
            student_price_flat_rate: Math.floor(Math.random() * 2000) + 500, // Random flat rate for students
            teacherPaymentType: `Type${Math.floor(Math.random() * 3) + 1}`, // Example teacher payment type
            teacher_price_per_session: Math.floor(Math.random() * 500) + 100, // Random price per session for teachers
            teacher_price_per_student: Math.floor(Math.random() * 300) + 50, // Random price per student
            teacher_price_flat_rate: Math.floor(Math.random() * 2000) + 500, // Random flat rate for teachers
            unpaid_total: Math.floor(Math.random() * 100), // Random unpaid total
            cours: cours, // Associate the PaymentMode with the Cours
        });

        // Save the new PaymentMode to the database
        const savedPaymentMode = await paymentModeRepository.save(newPaymentMode);
        paymentModesList.push(savedPaymentMode);
    }

    return paymentModesList;
}

async function createWalletPayments(
    numberOfPayments: number,
    studentsList: Student[]
) {
    const walletPaymentsRepository = DATA_SOURCE.getRepository(WalletPayments);
    const walletPaymentsList = [];

    for (let i = 0; i < numberOfPayments; i++) {
        // Randomly select a student from the students list
        const randomStudent = studentsList[Math.floor(Math.random() * studentsList.length)];

        // Create a new WalletPayment entity with random values and assign a student
        const newWalletPayment = walletPaymentsRepository.create({
            amount: Math.floor(Math.random() * 1000) + 100, // Random amount between 100 and 1100
            fromWallet: Math.random() < 0.5, // Random boolean for 'fromWallet'
            paid_at: new Date(), // Current date as payment date
            user: randomStudent, // Associate random student with the payment
        });

        // Save the new WalletPayment to the database
        const savedWalletPayment = await walletPaymentsRepository.save(newWalletPayment);
        walletPaymentsList.push(savedWalletPayment);
    }

    return walletPaymentsList;
}

export async function createFakeDB() {
    console.log("Starting database creation...");

    console.log("Creating 10 establishments...");
    const establishmentsList = await createEstablishments(10);
    console.log(`Created ${establishmentsList.length} establishments.`);

    console.log("Creating 10 rooms...");
    const roomsList = await createRooms(10);
    console.log(`Created ${roomsList.length} rooms.`);

    console.log("Creating 10 subjects...");
    const subjectsList = await createSubjects(10);
    console.log(`Created ${subjectsList.length} subjects.`);

    console.log("Creating 40 teachers and associating with establishments...");
    const teachersList = await createTeachers(40, establishmentsList);
    console.log(`Created ${teachersList.length} teachers.`);

    console.log("Creating 20 parents...");
    const parentsList = await createParents(20);
    console.log(`Created ${parentsList.length} parents.`);

    console.log("Creating 60 students and associating with establishments and parents...");
    const studentsList = await createStudents(60, establishmentsList, parentsList);
    console.log(`Created ${studentsList.length} students.`);

    console.log("Creating 100 courses and associating with teachers and subjects...");
    const coursesList = await createCourses(100, teachersList, subjectsList);
    console.log(`Created ${coursesList.length} courses.`);

    console.log("Creating 120 sessions and associating with rooms and courses...");
    const sessionsList = await createSessions(120, roomsList, coursesList);
    console.log(`Created ${sessionsList.length} sessions.`);

    console.log("Creating 150 attendances and associating with sessions and students...");
    const attendancesList = await createAttendances(150, sessionsList, studentsList);
    console.log(`Created ${attendancesList.length} attendances.`);

    console.log("Creating 50 teacher payments and associating with teachers and courses...");
    const teacherPaymentsList = await createTeacherPayments(50, teachersList, coursesList);
    console.log(`Created ${teacherPaymentsList.length} teacher payments.`);

    console.log("Creating 90 course-student associations...");
    const coursesStudentsList = await createCoursesStudents(90, studentsList, coursesList);
    console.log(`Created ${coursesStudentsList.length} course-student associations.`);

    console.log("Creating 70 student payments and associating with course-student associations...");
    const studentPaymentsList = await createStudentPayments(70, coursesStudentsList);
    console.log(`Created ${studentPaymentsList.length} student payments.`);

    console.log("Creating payment modes for each course...");
    const paymentModesList = await createPaymentModesForCourses(coursesList);
    console.log(`Created ${paymentModesList.length} payment modes.`);

    console.log("Creating 60 wallet payments and associating with students...");
    const walletPaymentsList = await createWalletPayments(60, studentsList);
    console.log(`Created ${walletPaymentsList.length} wallet payments.`);

    console.log("Database creation completed successfully.");
}