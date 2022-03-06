import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
describe('UserController', () => {
  let controller: UserController;
  let service: FakeUserService;

  class FakeUserService { 
    findAll() : any {};
    findOne(id:string) : any {};
    remove(id:string) : any {};
    create(createUserDto:CreateUserDto): any{};
    update(id:string,updateUserDto:UpdateUserDto): any{}
 }
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UserController],
      providers: [UserService],
    })
    .overrideProvider(UserService)
    .useClass(FakeUserService)
    .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<FakeUserService>(UserService);
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
        id:'1',
        name: 'mostafa',
        username: '123',
        password: '123',
      },
      {
        id:'2',
        name: 'ali',
        username: '123',
        password: '123',
      },
    ];
    const findAllSpy = jest.spyOn(service, 'findOne').mockResolvedValue(users[0]);

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
    const testUser = {
      name: 'milad',
      username: '1234',
      password: '1123',
    };
    const findAllSpy = jest.spyOn(service, 'create').mockResolvedValue(testUser);

    // Act
    const expectedValue = await controller.create(testUser);

    // Assert
    expect(service.create).toBeCalled();
    expect(expectedValue).toEqual(testUser);
    findAllSpy.mockReset();
  });

  it('should be update user', async () => {
    // Arrange
    const users = [
      {
        id:'1',
        name: 'mostafa',
        username: '123',
        password: '123',
      },
      {
        id:'2',
        name: 'ali',
        username: '123',
        password: '123',
      },
    ];
    const updateUser = {
      name: 'milad',
      username: '1234',
      password: '1123',
    };
    const findAllSpy = jest.spyOn(service, 'update').mockResolvedValue(updateUser);

    // Act
    const expectedValue = await controller.update('1',updateUser);

    // Assert
    expect(service.update).toBeCalled();
    expect(expectedValue).toEqual(updateUser);
    findAllSpy.mockReset();
  });
});