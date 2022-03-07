import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Management4Service } from './management4.service';
import { CreateManagement4Dto } from './dto/create-management4.dto';
import { UpdateManagement4Dto } from './dto/update-management4.dto';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('management4')
export class Management4Controller {
  constructor(private readonly management4Service: Management4Service) {}

  @Post()
  create(@Body() createManagement4Dto: CreateManagement4Dto) {
    return this.management4Service.create(createManagement4Dto);
  }

  @Get()
  Root(@Res() res: Response) {
    return res.render('management4', {
      title: 'management4',
      active: {
        management1: false,
        management2: false,
        management3: false,
        management4: true,
        management5: false,
        management6: false,
      },
    });
  }
  findAll() {
    return this.management4Service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.management4Service.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateManagement4Dto: UpdateManagement4Dto,
  ) {
    return this.management4Service.update(+id, updateManagement4Dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.management4Service.remove(+id);
  }
}
