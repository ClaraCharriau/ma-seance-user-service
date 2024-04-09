import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { VerifyResponseDto } from 'src/auth/dto/verifyResponse.dto';
import { SignInDto } from 'src/auth/dto/signIn.dto';
import * as mockUser from '../mocks/user_200.json';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';

describe('AuthController tests', () => {
  let authController: AuthController;
  let authService: AuthService;
  const mockToken = { access_token: 'mockToken' };
  const mockVerifyResponse: VerifyResponseDto = {
    isExistingAccount: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            logIn: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockToken)),
            signIn: jest.fn(),
            verify: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockVerifyResponse)),
            updateUser: jest.fn()
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should return a JWT token when user logs in successfully', async () => {
    // Given
    const email = 'test@example.com';
    const password = 'password';

    // When
    const result = await authController.logIn({ email, password });

    // Then
    expect(result).toEqual(mockToken);
  });

  it('should return true if user exists', async () => {
    // Given
    const email = 'test@example.com';
    const mockVerifyResponse: VerifyResponseDto = {
      isExistingAccount: true,
    };

    // When
    const result = await authController.verify({ email });

    // Then
    expect(result).toEqual(mockVerifyResponse);
  });

  it('should sign in and return a user when authentication is successful', async () => {
    // Given
    const signInDto: SignInDto = {
      pseudo: 'monicaGeller',
      email: 'email@mail.com',
      password: 'testPassword',
    };
    jest.spyOn(authService, 'signIn').mockResolvedValue(mockUser);

    // When
    const result = await authController.signIn(signInDto);

    // Then
    expect(result).toEqual(mockUser);
  });

  it('should update and return a user', async () => {
    // Given
    const id = '1';
    const updateUserDto: UpdateUserDto = {
      id,
      email: 'test@example.com',
      pseudo: 'newPseudo',
      password: 'newPassword',
    };
    jest.spyOn(authService, 'updateUser').mockResolvedValue(mockUser);

    // When
    const result = await authController.updateUser(id, updateUserDto);

    // Then
    expect(result).toEqual(mockUser);
  });
});
