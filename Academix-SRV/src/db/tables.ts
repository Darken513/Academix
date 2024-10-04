import { pool } from './pool';

export const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Create the 'subjects' table
    await client.query(`
      CREATE TABLE IF NOT EXISTS subjects (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the 'users' table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20),
        email VARCHAR(255) UNIQUE,
        role VARCHAR(50) NOT NULL,
        extra_details_id INTEGER,
        password VARCHAR(50) NOT NULL,
        enabled BOOLEAN,
        last_update TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the 'subject_users' table (junction table)
    await client.query(`
      CREATE TABLE IF NOT EXISTS subject_users (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        subject_id INT REFERENCES subjects(id) ON DELETE CASCADE
      );
    `);

    // Create the 'establishment'
    // TODO: Add trigger to update value of last_update
    await client.query(` 
      CREATE TABLE IF NOT EXISTS establishment (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255),
        enabled BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create the 'sessions' table
    // TODO: Add trigger to update value of last_update
    await client.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        id SERIAL PRIMARY KEY,
        cours_id VARCHAR(255) NOT NULL,
        room_id VARCHAR(255) NOT NULL,
        session_date DATE NOT NULL,
        start_time TIMESTAMP NOT NULL,
        end_time TIMESTAMP NOT NULL,
        enabled BOOLEAN NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query('COMMIT');
    console.log('Tables created successfully or already exist.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error creating tables:', error);
  } finally {
    client.release();
  }
};
