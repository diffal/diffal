import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogRequestService } from './log-request.service';
import { CreateLogRequestDto } from './dto/create-log-request.dto';
import { UpdateLogRequestDto } from './dto/update-log-request.dto';

@Controller('log-request')
export class LogRequestController {
}
