import { Role } from './Role';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone_number?: string;
  email?: string;
  role: Role;
  extra_details_id?: number;
  password?: string;
  enabled?: boolean;
  created_at?: Date;
  last_update?: Date;
}