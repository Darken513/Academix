import { UserService } from '../services/user.service';
import { BaseHttpController } from './basehttp.controller';
import { User } from '../models/userRoles/User';
import { Teacher } from '../models/userRoles/Teacher';
import { Student } from '../models/userRoles/Student';
import { Parent as ParentUser } from '../models/userRoles/Parent';
import { Admin } from '../models/userRoles/Admin';
import { UserRole } from '../models/userRoles/Role';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController extends BaseHttpController<User> {
  constructor() {
    const service = new UserService();
    super(service);
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { first_name, last_name, password, phone_number, role, establishment_id, yearLevel, note, imgURL } = req.body;
  
      // Check if user already exists
      const existingUser = await (this.service as UserService).findByPhoneNumber(phone_number);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      let newUser: User;
      
      // Create the appropriate user type based on the role
      switch (role) {
        case UserRole.TEACHER:
          newUser = new Teacher();
          (newUser as Teacher).establishment = establishment_id;
          break;
        case UserRole.STUDENT:
          newUser = new Student();
          (newUser as Student).yearLevel = yearLevel;
          (newUser as Student).establishment = establishment_id;
          break;
        case UserRole.PARENT:
          newUser = new ParentUser();
          newUser.walletBalance = 0.0;
          break;
        case UserRole.ADMIN:
          newUser = new Admin();
          (newUser as Admin).establishment = establishment_id;
          break;
        default:
          return res.status(400).json({ message: 'Invalid role' });
      }
  
      // Set common properties for all users
      newUser.first_name = first_name;
      newUser.last_name = last_name;
      newUser.password = password;
      newUser.phone_number = phone_number;
      newUser.note = note;
      newUser.imgURL = imgURL;
      newUser.role = role;

      // Save user to the database
      const savedUser = await (this.service as UserService).create(newUser);
      return res.status(201).json({ message: `${role} registered successfully`, user: savedUser });
    } catch (error) {
      return res.status(500).json({ message: 'Registration failed', error });
    }
  }
  

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { phone_number, password } = req.body;
  
      // Check if user exists
      const user = await (this.service as UserService).findByPhoneNumber(phone_number);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { id: user.id, phone_number: user.phone_number, role: user.role },
        'Academix',
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({ message: 'Login successful', token, role: user.role });
    } catch (error) {
      return res.status(500).json({ message: 'Login failed', error });
    }
  }
  
  
}