import { Injectable } from '@nestjs/common';
import { Environment } from 'src/enums/environment.enum';

@Injectable()
export class UploadService {
  static customFileName(req: Request, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }

  static destinationPath(req: Request, file: Express.Multer.File, cb) {
    cb(null, process.env[Environment.UPLOAD_ADDRESS]);
  }
}
