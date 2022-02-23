import { registerAs } from '@nestjs/config';
import { Environment } from 'src/enums/environment.enum';

export const dbConfig = registerAs('dbConfig', () => {
  return {
    host: process.env[Environment.DB_HOST],
    type: process.env[Environment.DB_TYPE],
    port: +process.env[Environment.DB_PORT],
    userName: process.env[Environment.DB_USER_NAME],
    password: process.env[Environment.DB_PASSWORD],
    database: process.env[Environment.DB_DATABASE],
  };
});
