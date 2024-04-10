import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { Repository } from 'typeorm';
import { User } from '../../src/user/entities/user.entity';
import { UserService } from '../../src/user/user.service';
import * as mockUser from '../mocks/user_200.json';

describe('UserService', () => {
  let service: UserService;
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

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    const result = await service.findUserByEmail(email);

    expect(result).toEqual(user);
  });

  it('should throw NotFoundException when user with given email does not exist', async () => {
    const email = 'nonexistent@example.com';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValueOnce(false);

    await expect(service.findUserByEmail(email)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return true if user exists', async () => {
    const email = 'test@example.com';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true);

    const result = await service.existsByEmail(email);

    expect(result).toBe(true);
  });

  it('should return false if user does not exist', async () => {
    const email = 'test@example.com';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(false);

    const result = await service.existsByEmail(email);

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

    const result = await service.createUser(email, pseudo, password);

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
    jest.spyOn(service as any, 'hashPassword').mockResolvedValue(hashedPassword);

    await service.updateUser(id, updateUserDto);

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

    await expect(service.updateUser(id, updateUserDto)).rejects.toThrow(NotFoundException);

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

    const result = await service.findUserById(id);

    expect(result).toEqual(user);
  });

  it('should throw NotFoundException when user with given email does not exist', async () => {
    const id = 'b7d10dc9-af37-4eb1-b67d-5fe347af5682';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValueOnce(false);

    await expect(service.findUserById(id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return true if user with given id exists', async () => {
    const email = '123';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true);

    const result = await service.existsById(email);

    expect(result).toBe(true);
  });

  it('should return false if user with given id does not exist', async () => {
    const email = '123';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(false);

    const result = await service.existsById(email);

    expect(result).toBe(false);
  });

  it('should delete user if user exists', async () => {
    // Given
    const id = '1';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(true);
    jest.spyOn(userRepository, 'delete').mockImplementation();

    // When
    await service.deleteUser(id);

    // Then
    expect(userRepository.existsBy).toHaveBeenCalledWith({id});
    expect(userRepository.delete).toHaveBeenCalledWith(id);
  });

  it('should throw on update user if user does not exists', async () => {
    // Given
    const id = '1';
    jest.spyOn(userRepository, 'existsBy').mockResolvedValue(false);

    // When
    await expect(service.deleteUser(id)).rejects.toThrow(NotFoundException);

    // Then
    expect(userRepository.existsBy).toHaveBeenCalledWith({id});
  });
});
