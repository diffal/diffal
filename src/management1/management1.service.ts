import { Injectable } from '@nestjs/common';
import { CreateManagement1Dto } from './dto/create-management1.dto';
import { UpdateManagement1Dto } from './dto/update-management1.dto';

@Injectable()
export class Management1Service {
  create(createManagement1Dto: CreateManagement1Dto) {
    return 'This action adds a new management1';
  }

  findAll() {
    return `This action returns all management1`;
  }

  findOne(id: number) {
    return `This action returns a #${id} management1`;
  }

  update(id: number, updateManagement1Dto: UpdateManagement1Dto) {
    return `This action updates a #${id} management1`;
  }

  remove(id: number) {
    return `This action removes a #${id} management1`;
  }
}
