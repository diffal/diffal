import { Injectable } from '@nestjs/common';
import { CreateManagement4Dto } from './dto/create-management4.dto';
import { UpdateManagement4Dto } from './dto/update-management4.dto';

@Injectable()
export class Management4Service {
  create(createManagement4Dto: CreateManagement4Dto) {
    return 'This action adds a new management4';
  }

  findAll() {
    return `This action returns all management4`;
  }

  findOne(id: number) {
    return `This action returns a #${id} management4`;
  }

  update(id: number, updateManagement4Dto: UpdateManagement4Dto) {
    return `This action updates a #${id} management4`;
  }

  remove(id: number) {
    return `This action removes a #${id} management4`;
  }
}
