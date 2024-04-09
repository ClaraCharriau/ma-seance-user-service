import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';
import { VerifyResponseDto } from 'src/auth/dto/verifyResponse.dto';

describe('AuthController tests', () => {
  let controller: AuthController;
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
            signIn: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockToken)),
            verify: jest
              .fn()
              .mockImplementation(() => Promise.resolve(mockVerifyResponse)),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a JWT token when user signs in successfully', async () => {
    // Given
    const email = 'test@example.com';
    const password = 'password';
    const mockToken = { access_token: 'mockToken' };

    // When
    const result = await controller.signIn({ email, password });

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
    const result = await controller.verify({ email });

    // Then
    expect(result).toEqual(mockVerifyResponse);
  });
});
