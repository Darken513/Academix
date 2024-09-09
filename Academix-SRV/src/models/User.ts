import { Role } from './Role';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  role: Role;
  created_at: Date;
}