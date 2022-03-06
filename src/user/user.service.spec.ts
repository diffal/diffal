import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import exp from 'constants';
import { TestBedModule } from '../test-bed/test-bed.module';
import { UserRepository } from './entities/user.repository';
import { UserService } from './user.service';
import { UtilityModule } from './utility/utility.module';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestBedModule.forRoot(),
        TypeOrmModule.forFeature([UserRepository]),
        UtilityModule,
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all return all users', async () => {
    const users = userRepository.create([
      {
        name: 'mostafa',
        username: '123',
        password: '123',
      },
      {
        name: 'ali',
        username: '123',
        password: '123',
      },
    ]);

    await userRepository.save(users);

    const retrievedUsers = await service.findAll();
    expect(retrievedUsers).toEqual(users);
  });

  it('should find one return user', async () => {
    const users = userRepository.create([
      {
        id: '1',
        name: 'mostafa',
        username: '123',
        password: '123',
      },
      {
        id: '2',
        name: 'ali',
        username: '123',
        password: '123',
      },
    ]);

    await userRepository.save(users);
    const retrievedUsers = await service.findOne('1');
    expect(retrievedUsers).toEqual(users[0]);
  });

  it('should remove and return user', async () => {
    //Arrange
    const users = userRepository.create({
      name: 'mostafa',
      username: '123',
      password: '123',
    });
    const realUser = await userRepository.save(users);
    //Act
    await service.remove(realUser.id);
    //Assert
    const expectedUser = await userRepository.findOne(realUser.id);
    expect(expectedUser).toBeUndefined();
  });

  it('should update return user', async () => {
    const users = userRepository.create([
      {
        id: '1',
        name: 'mostafa',
        username: '123',
        password: '123',
      },
      {
        id: '2',
        name: 'ali',
        username: '123',
        password: '123',
      },
    ]);
    await userRepository.save(users);
    const retrievedUsers = await service.update('1', {
      name: 'milad',
      username: '1234',
      password: '1123',
    });
    expect(retrievedUsers).toEqual({
      id: '1',
      name: 'milad',
      username: '1234',
      password: '1123',
    });
  });
});
