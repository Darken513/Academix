import { BaseHttpService } from './basehttp.service';
import { User } from '../models/userRoles/User';
import { DATA_SOURCE } from '../db/dataSource';
import { UserRole } from '../models/userRoles/Role';
import { Repository } from 'typeorm';

export class UserService extends BaseHttpService<User> {
  constructor() {
    super(DATA_SOURCE.getRepository(User));
  }

  async findByPhoneNumber(phone_number: string): Promise<User | null> {
    const userRepository: Repository<User> = DATA_SOURCE.getRepository(User);
    return await userRepository.findOne({ where: { phone_number } });
  }

  async getUserRole(): Promise<{ id: number; value: string }[]> {
    // Mimicking an async operation, like a database fetch
    const userRoles = Object.keys(UserRole).map((key, index) => ({
       id: index + 1,
       value: UserRole[key as keyof typeof UserRole]
    }));

    return userRoles;
  }  
}