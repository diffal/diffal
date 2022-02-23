import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestBedModule } from '../test-bed/test-bed.module';
import { UserRepository } from './entities/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TestBedModule.forRoot(),
        TypeOrmModule.forFeature([UserRepository]),
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
});
