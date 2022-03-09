import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/user.repository';
import { UtilityModule } from './utility/utility.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository]), UtilityModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
