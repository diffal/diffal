import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBedModule } from '../test-bed/test-bed.module';
import { UserRepository } from './entities/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestBedModule.forRoot(),
        TypeOrmModule.forFeature([UserRepository]),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return all user', async () => {
    const Users = userRepository.create([
      {
        name: 'mo',
        username: '1223',
        password: 1213,
      },
      {
        name: 'mostafa',
        username: '123',
        password: 123,
      }]);
    await userRepository.save(Users);
    const findall = await controller.findAll()
    // console.log(findall)
    expect(findall).toEqual(Users);
  })

  it('should be creat user , and work findOne method', async () => {
    const user = await controller.create({ name: "ali", username: "a", password: 123 })
    await userRepository.save(user);
    const find = await controller.findOne(user.id)
    expect(user).toEqual(find);
  })

  it('should be delete user , and work findOne method', async () => {
    const users = userRepository.create(
      {
        name: 'mostafa',
        username: '123',
        password: 123,
      });
    await userRepository.save(users);
    await controller.findOne(users.id)
    // console.log(user)
    await controller.remove(users.id)
    const find = await controller.findOne(users.id)
    expect(find).toBeUndefined();
  })

  it('should be update user , and work findOne method', async () => {
    const user = userRepository.create(
      {
        name: 'mostafa',
        username: '123',
        password: 123,
      });
    await userRepository.save(user);
    await controller.findOne(user.id)
    // console.log(user)
    const updateuser = { name: 'milad', username: '1234', password: 1123 }
    const updateUser = await controller.update(user.id, updateuser)
    expect(updateUser).toEqual({ id: user.id, ...updateuser });
  })
});



