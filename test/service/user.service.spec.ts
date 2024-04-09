import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
      id: "b7d10dc9-af37-4eb1-b67d-5fe347af5682",
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
    };

    jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

    const result = await service.createUser(email, pseudo, password);

    expect(result).toEqual(newUser);
  });
});
