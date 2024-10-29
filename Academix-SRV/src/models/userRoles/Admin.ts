import { ChildEntity } from 'typeorm';
import { Teacher } from './Teacher';

@ChildEntity('admins')
export class Admin extends Teacher {
}