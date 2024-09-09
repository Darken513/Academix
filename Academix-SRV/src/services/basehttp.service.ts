import { Pool } from 'pg';

export abstract class BaseHttpService<T> {
  protected tableName: string;

  constructor(protected db: Pool, tableName: string) {
    this.tableName = tableName;
  }

  public async getAll(): Promise<T[]> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName}`);
    return result.rows;
  }

  public async getById(id: string): Promise<T | null> {
    const result = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  public async create(data: T): Promise<T> {
    const keys = Object.keys((data as any)).join(', ');
    const values = Object.values((data as any));
    const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');

    const query = `INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders}) RETURNING *`;
    const result = await this.db.query(query, values);
    return result.rows[0];
  }

  public async deleteById(id: string): Promise<void> {
    await this.db.query(`DELETE FROM ${this.tableName} WHERE id = $1`, [id]);
  }
}
