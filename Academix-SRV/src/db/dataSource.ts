import { DataSource } from "typeorm";

// Initialize the data source
const DATA_SOURCE = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'academix',
    synchronize: true,
    dropSchema: true,
    entities: [__dirname + '/../models/**/*.ts', __dirname + '/../models/*.ts'],
    logging: false,
});

export { DATA_SOURCE };