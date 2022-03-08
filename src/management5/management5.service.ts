import { Injectable } from '@nestjs/common';
import { CreateManagement5Dto } from './dto/create-management5.dto';
import { UpdateManagement5Dto } from './dto/update-management5.dto';

@Injectable()
export class Management5Service {
  create(createManagement5Dto: CreateManagement5Dto) {
    return 'This action adds a new management5';
  }

  findAll() {
    return `This action returns all management5`;
  }

  findOne(id: number) {
    return `This action returns a #${id} management5`;
  }

  update(id: number, updateManagement5Dto: UpdateManagement5Dto) {
    return `This action updates a #${id} management5`;
  }

  remove(id: number) {
    return `This action removes a #${id} management5`;
  }
}
