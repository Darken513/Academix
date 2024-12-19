import { BaseHttpService } from './basehttp.service';
import { User } from '../models/userRoles/User';
import { DATA_SOURCE } from '../db/dataSource';
import { UserRole } from '../models/userRoles/Role';
import { Repository } from 'typeorm';

export class UserService extends BaseHttpService<User> {
  private static instance: UserService;

  private constructor() {
    super(DATA_SOURCE.getRepository(User));
  }

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async findByPhoneNumber(phone_number: string): Promise<User | null> {
    const userRepository: Repository<User> = DATA_SOURCE.getRepository(User);
    return await userRepository.findOne({ where: { phone_number } });
  }

  getUserRole(): string[] {
    const userRoles = Object.keys(UserRole).map((key, index) => (
      UserRole[key as keyof typeof UserRole]
    ));

    return userRoles;
  }
}