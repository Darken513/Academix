import { Pool } from 'pg';

export const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'academix',
  password: 'root',
  port: 5432,
});