import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { uldConfig } from 'src/config/uld.config';
import { UploadController } from './upload.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule.forFeature(uldConfig)],
      inject: [uldConfig.KEY],
      useFactory: (uldConfigService: ConfigType<typeof uldConfig>) => ({
        dest: uldConfigService.dest,
      }),
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
