import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { Environment } from 'src/enums/environment.enum';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.register({
      // dest: process.env[Environment.UPLOAD_ADDRESS],
      dest: 'files/upload',
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
