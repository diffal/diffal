import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Management6Service } from './management6.service';
import { CreateManagement6Dto } from './dto/create-management6.dto';
import { UpdateManagement6Dto } from './dto/update-management6.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('management6')
export class Management6Controller {
  constructor(private readonly management6Service: Management6Service) {}

  @Post()
  create(@Body() createManagement6Dto: CreateManagement6Dto) {
    return this.management6Service.create(createManagement6Dto);
  }

  @Get()
  Root(@Res() res: Response) {
    return res.render('management6', {
      title: 'management6',
    });
  }
  findAll() {
    return this.management6Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.management6Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagement6Dto: UpdateManagement6Dto,
  ) {
    return this.management6Service.update(+id, updateManagement6Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.management6Service.remove(+id);
  }
}
