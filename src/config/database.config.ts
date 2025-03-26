import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG = () => {
  const dbConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(<string>process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    autoLoadEntities: true,
    synchronize: true,
    connectTimeoutMS: 10000,
    retryAttempts: 2,
    retryDelay: 1000,
    logger: 'advanced-console',
    entities: [path.join(__dirname, '/../modules/**/entities/*.js')],
  };

  return dbConfig;
};
