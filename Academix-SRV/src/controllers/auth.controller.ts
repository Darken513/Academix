import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRole } from '../models/userRoles/Role';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admins.service';
import { TeacherService } from '../services/teachers.service';
import { ParentService } from '../services/parents.service';
import { StudentService } from '../services/students.service';
import { Student } from '../models/userRoles/Student';
import { Teacher } from '../models/userRoles/Teacher';
import { User } from '../models/userRoles/User';
import { Parent } from '../models/userRoles/Parent';
import { Admin } from '../models/userRoles/Admin';
import { AppRequest } from '../core/AppRequest';

export class AuthController {
  private userService = UserService.getInstance();
  private servicesByRole = {
    [UserRole.TEACHER]: TeacherService.getInstance(),
    [UserRole.STUDENT]: StudentService.getInstance(),
    [UserRole.PARENT]: ParentService.getInstance(),
    [UserRole.ADMIN]: AdminService.getInstance(),
  };

  constructor() { }

  async register(req: AppRequest, res: Response): Promise<Response> {
    try {
      const { phone_number, role } = req.body;

      if (await this.isUserExisting(phone_number)) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = await this.createUserInstance(req.body);
      if (!newUser) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      const savedUser = await this.saveUserByRole(newUser, role);
      return res.status(201).json({ message: `${role} registered successfully`, user: savedUser });
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed', error });
    }
  }

  async login(req: AppRequest, res: Response): Promise<Response> {
    try {
      const { phone_number, password } = req.body;

      const user = await this.userService.findByPhoneNumber(phone_number);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = this.generateJwtToken(user);
      return res.status(200).json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error });
    }
  }

  private async isUserExisting(phone_number: string): Promise<boolean> {
    return !!(await this.userService.findByPhoneNumber(phone_number));
  }

  private async createUserInstance(data: any): Promise<User | null> {
    const { first_name, last_name, password, phone_number, role, establishment_id, yearLevel, note, imgURL } = data;
    const newUser = this.initializeUserByRole(role);

    if (!newUser) return null;

    if (role === UserRole.TEACHER) {
      (newUser as Teacher).establishment = establishment_id;
    } else if (role === UserRole.STUDENT) {
      (newUser as Student).yearLevel = yearLevel;
      (newUser as Student).establishment = establishment_id;
    } else if (role === UserRole.PARENT) {
      (newUser as Parent).walletBalance = 0.0;
    } else if (role === UserRole.ADMIN) {
      (newUser as Admin).establishment = establishment_id;
    }

    newUser.first_name = first_name;
    newUser.last_name = last_name;
    newUser.password = password;
    newUser.phone_number = phone_number;
    newUser.note = note;
    newUser.imgURL = imgURL;
    newUser.role = role;

    return newUser;
  }

  private initializeUserByRole(role: UserRole): User | null {
    switch (role) {
      case UserRole.TEACHER: return new Teacher();
      case UserRole.STUDENT: return new Student();
      case UserRole.PARENT: return new Parent();
      case UserRole.ADMIN: return new Admin();
      default: return null;
    }
  }

  private async saveUserByRole(user: User, role: UserRole): Promise<User> {
    const service = this.servicesByRole[role];
    return service.create((user as any));
  }

  private generateJwtToken(user: User): string {
    return jwt.sign(
      { id: user.id, phone_number: user.phone_number, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
  }
}
