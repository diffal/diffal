import { registerAs } from '@nestjs/config';
import { Environment } from 'src/enums/environment.enum';

export const uldConfig = registerAs('uldConfig', () => {
  return {
    dest: process.env[Environment.UPLOAD_ADDRESS],
  };
});
