import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Management5Service } from './management5.service';
import { CreateManagement5Dto } from './dto/create-management5.dto';
import { UpdateManagement5Dto } from './dto/update-management5.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('management5')
export class Management5Controller {
  constructor(private readonly management5Service: Management5Service) {}

  @Post()
  create(@Body() createManagement5Dto: CreateManagement5Dto) {
    return this.management5Service.create(createManagement5Dto);
  }

  @Get()
  root(@Res() res: Response) {
    return res.render('management5', {
      title: 'management5',
      active: {
        management1: false,
        management2: false,
        management3: false,
        management4: false,
        management5: true,
        management6: false,
      },
    });
  }
  findAll() {
    return this.management5Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.management5Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagement5Dto: UpdateManagement5Dto,
  ) {
    return this.management5Service.update(+id, updateManagement5Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.management5Service.remove(+id);
  }
}
