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
      id: '1',
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
});
