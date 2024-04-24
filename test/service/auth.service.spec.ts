import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
const bcrypt = require('bcrypt');
import { VerifyResponseDto } from 'src/auth/dto/verifyResponse.dto';
import { AuthService } from '../../src/auth/auth.service';
import { UserService } from '../../src/user/user.service';
import * as mockUser from '../mocks/user_200.json';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn(),
            findUserById: jest.fn(),
            existsByEmail: jest.fn(),
            existsById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('fakeAccessToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
  it('should return an access token when valid email and password are provided', async () => {
    // Given
    const email = 'test@example.com';
    const password = 'password123';
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(mockUser);

    // When
    const result = await authService.logIn(email, password);

    // Then
    expect(result.access_token).toEqual('fakeAccessToken');
  });

  it('should throw UnauthorizedException when invalid password is provided', async () => {
    // Given
    const email = 'test@example.com';
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

    // When then
    await expect(authService.logIn(email, 'wrongpassword')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return true when user with given email exists', async () => {
    // Given
    const email = 'test@example.com';
    jest.spyOn(userService, 'existsByEmail').mockResolvedValueOnce(true);

    // When
    const result: VerifyResponseDto = await authService.verify(email);

    // Then
    expect(result.isExistingAccount).toBe(true);
  });

  it('should return false when user with given email does not exist', async () => {
    // Given
    const email = 'nonexistent@example.com';
    jest.spyOn(userService, 'existsByEmail').mockResolvedValueOnce(false);

    // When
    const result: VerifyResponseDto = await authService.verify(email);

    // Then
    expect(result.isExistingAccount).toBe(false);
  });

  it('should throw BadRequestException if email is not provided', async () => {
    await expect(authService.verify('')).rejects.toThrow(BadRequestException);
  });

  it('should throw BadRequestException if user with given email already exists', async () => {
    // Given
    const signInDto = {
      email: 'test@example.com',
      pseudo: 'TotoDu67',
      password: 'awesomePass18789'
    }
    jest.spyOn(userService, 'existsByEmail').mockResolvedValueOnce(true);

    // When
    await expect(authService.signIn(signInDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should create a new user and return it if user with given email does not exist', async () => {
    // Given
    const email = 'test@example.com';
    const pseudo = 'TotoDu67';
    const signInDto = {
      email,
      pseudo,
      password: 'awesomePass18789'
    }
    const id = 'e047bda3-b2fa-418b-adb6-c0cfaad7b18b';
    jest.spyOn(userService, 'existsByEmail').mockResolvedValueOnce(false);
    jest.spyOn(userService, 'createUser').mockResolvedValueOnce({
      id,
      email,
      pseudo,
      password: 'hashPass',
    });

    // When
    const result = await authService.signIn(signInDto);

    // Then
    expect(result).toEqual({
      id: 'e047bda3-b2fa-418b-adb6-c0cfaad7b18b',
      email: 'test@example.com',
      pseudo: 'TotoDu67',
      password: 'hashPass',
    });
  });

  it('should update an user', async () => {
    // Given
    const email = 'test@example.com';
    const id = 'e047bda3-b2fa-418b-adb6-c0cfaad7b18b';
    const updateUserDto: UpdateUserDto = {
      id,
      email: 'test@example.com',
      pseudo: 'newPseudo',
      password: 'newPassword',
    };
    const updatedUser: UpdateUserDto = {
      id,
      email: 'test@example.com',
      pseudo: 'newPseudo',
      password: 'hashPass',
    };
    const updateUserSpy = jest.spyOn(userService, 'updateUser');
    jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(updatedUser);

    // When
    const result = await authService.updateUser(id, updateUserDto);

    // Then
    expect(result).toEqual({
      id: 'e047bda3-b2fa-418b-adb6-c0cfaad7b18b',
      email,
      pseudo: 'newPseudo',
      password: 'hashPass',
    });
    expect(updateUserSpy).toHaveBeenCalled();
  });

  it('should delete an user if the user exists', async () => {
    // Given
    const id = 'e047bda3-b2fa-418b-adb6-c0cfaad7b18b';
    const deleteUserSpy = jest.spyOn(userService, 'deleteUser');

    // When
    await authService.deleteUser(id);

    // Then
    expect(deleteUserSpy).toHaveBeenCalled();
  });
});
