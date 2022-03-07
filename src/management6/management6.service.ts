import { Injectable } from '@nestjs/common';
import { CreateManagement6Dto } from './dto/create-management6.dto';
import { UpdateManagement6Dto } from './dto/update-management6.dto';

@Injectable()
export class Management6Service {
  create(createManagement6Dto: CreateManagement6Dto) {
    return 'This action adds a new management6';
  }

  findAll() {
    return `This action returns all management6`;
  }

  findOne(id: number) {
    return `This action returns a #${id} management6`;
  }

  update(id: number, updateManagement6Dto: UpdateManagement6Dto) {
    return `This action updates a #${id} management6`;
  }

  remove(id: number) {
    return `This action removes a #${id} management6`;
  }
}
