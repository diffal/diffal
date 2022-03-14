import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Management1Service } from './management1.service';
import { CreateManagement1Dto } from './dto/create-management1.dto';
import { UpdateManagement1Dto } from './dto/update-management1.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('management1')
export class Management1Controller {
  constructor(private readonly management1Service: Management1Service) {}

  @Post()
  create(@Body() createManagement1Dto: CreateManagement1Dto) {
    return this.management1Service.create(createManagement1Dto);
  }

  @Get()
  root(@Res() res: Response) {
    return res.render('management1', {
      title: 'management1',
      active: {
        management1: true,
        management2: false,
        management3: false,
        management4: false,
        management5: false,
        management6: false,
      },
    });
  }

  findAll() {
    return this.management1Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.management1Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagement1Dto: UpdateManagement1Dto,
  ) {
    return this.management1Service.update(+id, updateManagement1Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.management1Service.remove(+id);
  }
}
