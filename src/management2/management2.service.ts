import { Injectable } from '@nestjs/common';
import { CreateManagement2Dto } from './dto/create-management2.dto';
import { UpdateManagement2Dto } from './dto/update-management2.dto';

@Injectable()
export class Management2Service {
  create(createManagement2Dto: CreateManagement2Dto) {
    return 'This action adds a new management2';
  }

  findAll() {
    return `This action returns all management2`;
  }

  findOne(id: number) {
    return `This action returns a #${id} management2`;
  }

  update(id: number, updateManagement2Dto: UpdateManagement2Dto) {
    return `This action updates a #${id} management2`;
  }

  remove(id: number) {
    return `This action removes a #${id} management2`;
  }
}
