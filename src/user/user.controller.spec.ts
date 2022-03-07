import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserService } from './user.service';
jest.mock('./user.service.ts');
describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be return all users', async () => {
    // Arrange
    const users = [];
    const findAllSpy = jest.spyOn(service, 'findAll').mockResolvedValue(users);

    // Act
    const expectedValue = await controller.findAll();

    // Assert
    expect(service.findAll).toBeCalled();
    expect(expectedValue).toEqual(users);

    findAllSpy.mockReset();
  });

  it('should be return one user', async () => {
    // Arrange
    const users = [
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
    ];
    const findAllSpy = jest
      .spyOn(service, 'findOne')
      .mockResolvedValue(users[0]);

    // Act
    const expectedValue = await controller.findOne('1');

    // Assert
    expect(service.findOne).toBeCalled();
    expect(expectedValue).toEqual(users[0]);
    findAllSpy.mockReset();
  });

  it('should be delete user', async () => {
    // Arrange
    const users = [];
    const findAllSpy = jest.spyOn(service, 'remove').mockResolvedValue(null);

    // Act
    const expectedValue = await controller.remove('1');

    // Assert
    expect(service.remove).toBeCalled();
    expect(expectedValue).toEqual(null);
    findAllSpy.mockReset();
  });

  it('should be create user', async () => {
    // Arrange
    const testUser: CreateUserDto = {
      name: 'milad',
      username: '1234',
      password: '1123',
    };
    const expectedReturn = {
      id: '1',
      ...testUser,
    };
    const findAllSpy = jest
      .spyOn(service, 'create')
      .mockResolvedValue(expectedReturn);

    // Act
    const expectedValue = await controller.create(testUser);

    // Assert
    expect(service.create).toBeCalled();
    expect(expectedValue).toEqual(expectedReturn);
    findAllSpy.mockReset();
  });

  it('should be update user', async () => {
    // Arrange
    const users = [
      {
        id: '1',
        name: 'mostafa',
        username: '123',
        password: '123',
      },
    ];
    const updateUser = {
      name: 'milad',
      username: '1234',
      password: '1123',
    };
    const expectedReturn = {
      id: '1',
      ...updateUser,
    };
    const findAllSpy = jest
      .spyOn(service, 'update')
      .mockResolvedValue(expectedReturn);

    // Act
    const expectedValue = await controller.update('1', updateUser);

    // Assert
    expect(service.update).toBeCalled();
    expect(expectedValue).toEqual(expectedReturn);
    findAllSpy.mockReset();
  });
});
