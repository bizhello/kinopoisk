import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { config } from'dotenv';

config();

export default new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    synchronize: false,
    logging: false,
    entities: [`${__dirname}/src/entity/*{.js,.ts}`],
    migrations: [`${__dirname}/src/migration/*{.js,.ts}`],
    migrationsTableName: 'migrations',
    namingStrategy: new SnakeNamingStrategy(),
});
