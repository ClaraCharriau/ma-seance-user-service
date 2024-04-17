import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../../src/guard/auth.gard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  const mockUser = {
    id: '123',
    pseudo: 'Jane',
    email: 'test@mail.com',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: {
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<AuthGuard>(AuthGuard);
  });

  it('should throw UnauthorizedException if no token provided', async () => {
    // Given
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    };

    // Then
    await expect(
      guard.canActivate(mockExecutionContext as any),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw Unauthorized Exception if user id from token and user ids does not match', async () => {
    // Given
    const mockToken = 'validToken';
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${mockToken}`,
          },
          params: {
            userId: "123",
          },
        }),
      }),
    };
    const mockPayload = {
      id: '1',
      pseudo: 'Jane',
      email: 'test@mail.com',
    };
    const jwtService = {
      verifyAsync: jest.fn().mockResolvedValue(mockPayload),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();
    const guard = module.get<AuthGuard>(AuthGuard);

    // Then
    await expect(
      guard.canActivate(mockExecutionContext as any),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return true if token is provided and user ids match', async () => {
    // Given
    const mockUserId = '123';
    const mockToken = 'validToken';
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            authorization: `Bearer ${mockToken}`,
          },
          params: {
            userId: mockUserId,
          },
        }),
      }),
    };
    const mockPayload = {
      user: mockUser
    };
    const jwtService = {
      verifyAsync: jest.fn().mockResolvedValue(mockPayload),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: JwtService,
          useValue: jwtService,
        },
      ],
    }).compile();
    const guard = module.get<AuthGuard>(AuthGuard);

    // When
    const result = await guard.canActivate(mockExecutionContext as any);

    // Then
    expect(result).toBe(true);
  });
});
