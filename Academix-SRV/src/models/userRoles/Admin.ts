import { ChildEntity } from 'typeorm';
import { Teacher } from './Teacher';

@ChildEntity('Admin')
export class Admin extends Teacher {
}