import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { VerifyResponseDto } from 'src/auth/dto/verifyResponse.dto';
import { AuthService } from '../../src/auth/auth.service';
import { UserService } from '../../src/user/user.service';
import * as mockUser from '../mocks/user_200.json';

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
    const result = await authService.signIn(email, password);

    // Then
    expect(result.access_token).toEqual('fakeAccessToken');
  });

  it('should throw UnauthorizedException when invalid password is provided', async () => {
    // Given
    const email = 'test@example.com';
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

    // When then
    await expect(authService.signIn(email, 'wrongpassword')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should return true when user with given email exists', async () => {
    // Given
    const email = 'test@example.com';
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(mockUser);

    // When
    const result: VerifyResponseDto = await authService.verify(email);

    // Then
    expect(result.isExistingAccount).toBe(true);
  });

  it('should return false when user with given email does not exist', async () => {
    // Given
    const email = 'nonexistent@example.com';
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValueOnce(undefined);

    // When
    const result: VerifyResponseDto = await authService.verify(email);

    // Then
    expect(result.isExistingAccount).toBe(false);
  });
});
