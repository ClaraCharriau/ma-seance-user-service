import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { Repository } from 'typeorm';
import { User } from '../../src/user/entity/user.entity';
import { UserService } from '../../src/user/user.service';
import * as mockUser from '../mocks/user_200.json';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          useValue: {
            existsBy: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return a user when user with given email exists', async () => {
    const email = 'email@mail.com';
    const user = {
      id: 'b7d10dc9-af37-4eb1-b67d-5fe347af5682',
      email,
      pseudo: 'monicaGeller',
      password: '$2b$10$Xh.fhtFvRA12F2qMjbSbEe9YVZHLhNBW3CIOtKqEiOJbkldYO2L5q',
    };
    jest.spyOn(userRepository, 'existsBy').mockResolvedValueOnce(true);
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);

    const result = await userService.findUserByEmail(email);

    expect(result).toEqual(user);
  });

  it('should throw NotFoundException when user with given email does not exist', async () => {
    const email = 'nonexistent@example.com';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValueOnce(false);

    await expect(userService.findUserByEmail(email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return true if user exists', async () => {
    const email = 'test@example.com';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true);

    const result = await userService.existsByEmail(email);

    expect(result).toBe(true);
  });

  it('should return false if user does not exist', async () => {
    const email = 'test@example.com';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(false);

    const result = await userService.existsByEmail(email);

    expect(result).toBe(false);
  });

  it('should create a new user', async () => {
    const email = 'test@example.com';
    const pseudo = 'testUser';
    const password = 'testPassword';
    const newUser = {
      id: expect.any(String),
      email,
      pseudo,
      password: expect.any(String),
      watchlist: [],
      agenda: [],
      favoriteTheaters: []
    };
    const expectedUserDto = {
      id: expect.any(String),
      email,
      pseudo,
      password: expect.any(String)
    };

    jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

    const result = await userService.createUser(email, pseudo, password);

    expect(result).toEqual(expectedUserDto);
  });

  it('should update user if user exists', async () => {
    const id = '1';
    const email = 'test@example.com';
    const updateUserDto: UpdateUserDto = {
      id,
      email,
      pseudo: 'newPseudo',
      password: 'newPassword',
    };
    const hashedPassword = 'hashedPassword';

    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true);
    jest.spyOn(userRepository, 'update').mockResolvedValue({} as any);
    jest.spyOn(userService as any, 'hashPassword').mockResolvedValue(hashedPassword);

    await userService.updateUser(id, updateUserDto);

    expect(userRepository.existsBy).toHaveBeenCalledWith({ id });
    expect(userRepository.update).toHaveBeenCalledWith(id, {
      email,
      id,
      pseudo: updateUserDto.pseudo,
      password: hashedPassword,
    });
  });

  it('should throw on update user if user does not exists', async () => {
    const id = '1';
    const updateUserDto: UpdateUserDto = {
      id,
      email: 'test@example.com',
      pseudo: 'newPseudo',
      password: 'newPassword',
    };

    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(false);

    await expect(userService.updateUser(id, updateUserDto)).rejects.toThrow(NotFoundException);

    expect(userRepository.existsBy).toHaveBeenCalledWith({ id });
  });

  it('should return a user when user with given id exists', async () => {
    const id = 'b7d10dc9-af37-4eb1-b67d-5fe347af5682';
    const user = {
      id,
      email: "email@mail.com",
      pseudo: 'monicaGeller',
      password: '$2b$10$Xh.fhtFvRA12F2qMjbSbEe9YVZHLhNBW3CIOtKqEiOJbkldYO2L5q',
    };
    jest.spyOn(userRepository, 'existsBy').mockResolvedValueOnce(true);
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);

    const result = await userService.findUserById(id);

    expect(result).toEqual(user);
  });

  it('should throw NotFoundException when user with given email does not exist', async () => {
    const id = 'b7d10dc9-af37-4eb1-b67d-5fe347af5682';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValueOnce(false);

    await expect(userService.findUserById(id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return true if user with given id exists', async () => {
    const email = '123';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true);

    const result = await userService.existsById(email);

    expect(result).toBe(true);
  });

  it('should return false if user with given id does not exist', async () => {
    const email = '123';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(false);

    const result = await userService.existsById(email);

    expect(result).toBe(false);
  });

  it('should delete user if user exists', async () => {
    // Given
    const id = '1';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true);
    jest.spyOn(userRepository, 'delete').mockImplementation();

    // When
    await userService.deleteUser(id);

    // Then
    expect(userRepository.existsBy).toHaveBeenCalledWith({id});
    expect(userRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw on update user if user does not exists', async () => {
    // Given
    const id = '1';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(false);

    // When
    await expect(userService.deleteUser(id)).rejects.toThrow(NotFoundException);

    // Then
    expect(userRepository.existsBy).toHaveBeenCalledWith({id});
  });
});
