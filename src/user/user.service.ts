import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './entities/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    });
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    return this.userRepository.save(user);
  }


  async remove(id: string) {
    const user = await this.findOne(id)
    if (!user) {
      throw new NotFoundException(`user with id ${id} not found`);
    }
    return this.userRepository.remove(user);
  }
}
