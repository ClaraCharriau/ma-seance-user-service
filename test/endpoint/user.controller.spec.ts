import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { WatchlistService } from '../../src/user/watchlist.service';
import * as mockWatchlist from '../mocks/watchlist_200.json';
import * as mockUserIdResponse400 from '../mocks/unknown_user_id_400.json';
import { AuthGuard } from '../../src/guard/auth.gard';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let userController: UserController;
  let watchlistService: WatchlistService;

  beforeEach(async () => {
    const mockGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        AuthGuard,
        JwtService,
        {
          provide: WatchlistService,
          useValue: {
            getUserWatchlistMovies: jest.fn(),
            removeMovieFromWatchlist: jest.fn(),
            addMovieInWatchlist: jest.fn()
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .compile();

    userController = module.get<UserController>(UserController);
    watchlistService = module.get<WatchlistService>(WatchlistService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return 200 when successfully get user watchlist', async () => {
    // Given
    const userId = '123';
    const watchlist = [
      {
        id: 'f1545604-573e-4d46-9644-0279b1967e2c',
        tmdbId: '437342',
      },
      {
        id: 'b90c3b68-cb48-47bb-bbe9-66b2b594e9f2',
        tmdbId: '1125311',
      },
    ];
    jest
      .spyOn(watchlistService, 'getUserWatchlistMovies')
      .mockResolvedValueOnce(mockWatchlist);

    // When
    const result = await userController.getUserWatchlistMovies(userId);

    // Then
    expect(result).toEqual(watchlist);
  });

  it('should return 200 when successfully delete movie in user watchlist', async () => {
    // Given
    const userId = '123';
    const movieId = '456';
    jest
      .spyOn(watchlistService, 'removeMovieFromWatchlist')
      .mockResolvedValueOnce();

    // When
    await userController.deleteMovieFromUserWatchlist(userId, movieId);

    // Then
    expect(watchlistService.removeMovieFromWatchlist).toHaveBeenCalled();
  });

  it('should return 200 when successfully add movie in user watchlist', async () => {
    // Given
    const userId = '123';
    const movieId = '456';
    jest
      .spyOn(watchlistService, 'addMovieInWatchlist')
      .mockResolvedValueOnce();

    // When
    await userController.addMovieInUserWatchlist(userId, movieId);

    // Then
    expect(watchlistService.addMovieInWatchlist).toHaveBeenCalledWith(userId, movieId);
  });
});
