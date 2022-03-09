import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uldConfig } from 'src/config/uld.config';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule.forFeature(uldConfig)],
      inject: [uldConfig.KEY],
      useFactory: (uldConfigService: ConfigType<typeof uldConfig>) => ({
        dest: uldConfigService.dest,
        storage: diskStorage({
          destination: uldConfigService.dest,
          filename: UploadService.customFileName,
        }),
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
