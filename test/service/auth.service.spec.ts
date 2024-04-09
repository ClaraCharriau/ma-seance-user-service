import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../src/auth/auth.service';
import { UserService } from '../../src/user/user.service';
import * as mockUser from '../mocks/user_200.json';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(mockUser),
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
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });
  it('should return an access token when valid email and password are provided', async () => {
    // Given
    const email = 'test@example.com';
    const password = 'password123';
    jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

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

  it('should return true if password matches hashed password', async () => {
    // Given
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // When
    const result = await authService.isPasswordValid(password, hashedPassword);

    // Then
    expect(result).toBe(true);
  });

  it('should return false if password does not match hashed password', async () => {
    // Given
    const password = 'password123';
    const wrongPassword = 'wrongpassword';
    const hashedPassword = await bcrypt.hash(password, 10);

    // When
    const result = await authService.isPasswordValid(
      wrongPassword,
      hashedPassword,
    );

    // Then
    expect(result).toBe(false);
  });
});
