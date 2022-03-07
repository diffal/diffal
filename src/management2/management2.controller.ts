import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Management2Service } from './management2.service';
import { CreateManagement2Dto } from './dto/create-management2.dto';
import { UpdateManagement2Dto } from './dto/update-management2.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('management2')
export class Management2Controller {
  constructor(private readonly management2Service: Management2Service) {}

  @Post()
  create(@Body() createManagement2Dto: CreateManagement2Dto) {
    return this.management2Service.create(createManagement2Dto);
  }

  @Get()
  Root(@Res() res: Response) {
    return res.render('management2', {
      title: 'management2',
      active: {
        management1: false,
        management2: true,
        management3: false,
        management4: false,
        management5: false,
        management6: false,
      },
    });
  }
  findAll() {
    return this.management2Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.management2Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagement2Dto: UpdateManagement2Dto,
  ) {
    return this.management2Service.update(+id, updateManagement2Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.management2Service.remove(+id);
  }
}
