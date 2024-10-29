import { ChildEntity, OneToMany } from 'typeorm';
import { Student } from './Student';
import { User } from './User';

@ChildEntity('parents')
export class Parent extends User {

  @OneToMany(() => Student, (student) => student.parent)
  children?: Student[];
}