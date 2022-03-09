import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  static customFileName(req, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
}
