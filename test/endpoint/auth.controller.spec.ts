import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../src/auth/auth.controller';
import { AuthService } from '../../src/auth/auth.service';

describe('AuthController tests', () => {
  let controller: AuthController;
  const mockToken = { access_token: 'mockToken' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn()
            .mockImplementation(() => Promise.resolve(mockToken))
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a JWT token when user signs in', async () => {
    // Given
    const email = 'test@example.com';
    const password = 'password';
    const mockToken = { access_token: 'mockToken' };

    // When
    const result = await controller.signIn({ email, password });

    // Then
    expect(result).toEqual(mockToken);
  });
});
