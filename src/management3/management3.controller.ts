import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Management3Service } from './management3.service';
import { CreateManagement3Dto } from './dto/create-management3.dto';
import { UpdateManagement3Dto } from './dto/update-management3.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('management3')
export class Management3Controller {
  constructor(private readonly management3Service: Management3Service) { }

  @Post()
  create(@Body() createManagement3Dto: CreateManagement3Dto) {
    return this.management3Service.create(createManagement3Dto);
  }

  @Get()
  Root(@Res() res: Response) {
    return res.render('management3', {
      title: 'management3',
      active: { management1: false, management2: false, management3: true, management4: false, management5: false, management6: false },

    });
  }
  findAll() {
    return this.management3Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.management3Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagement3Dto: UpdateManagement3Dto,
  ) {
    return this.management3Service.update(+id, updateManagement3Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.management3Service.remove(+id);
  }
}
