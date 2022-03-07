import { Injectable } from '@nestjs/common';
import { CreateManagement3Dto } from './dto/create-management3.dto';
import { UpdateManagement3Dto } from './dto/update-management3.dto';

@Injectable()
export class Management3Service {
  create(createManagement3Dto: CreateManagement3Dto) {
    return 'This action adds a new management3';
  }

  findAll() {
    return `This action returns all management3`;
  }

  findOne(id: number) {
    return `This action returns a #${id} management3`;
  }

  update(id: number, updateManagement3Dto: UpdateManagement3Dto) {
    return `This action updates a #${id} management3`;
  }

  remove(id: number) {
    return `This action removes a #${id} management3`;
  }
}
