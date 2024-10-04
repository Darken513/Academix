import { Repository, ObjectLiteral } from 'typeorm';

//todo add some error handling to avoid server crash
export abstract class BaseHttpService<T extends ObjectLiteral> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  public async getAll(): Promise<T[]> {
    return await this.repository.find();
  }

  public async getById(id: number): Promise<T | null> {
    let args: any = { id };
    return await this.repository.findOneBy(args);
  }

  public async create(data: T): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  public async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}