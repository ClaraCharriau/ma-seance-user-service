import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { WatchlistService } from '../../src/user/watchlist.service';
import * as mockWatchlist from '../mocks/watchlist_200.json';
import * as mockUserIdResponse400 from '../mocks/unknown_user_id_400.json';

describe('UserController', () => {
  let userController: UserController;
  let watchlistService: WatchlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: WatchlistService,
          useValue: {
            getUserWatchlistMovies: jest.fn(),
          },
        },
      ],
    }).compile();

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

  it('should return 400 when user id does not exists', async () => {
    // Given
    const userId = '6d747e8b-e950-4e63-8203-4f5ff7b67211';
    jest
      .spyOn(watchlistService, 'getUserWatchlistMovies')
      .mockRejectedValueOnce(mockUserIdResponse400);

    // When
    try {
      await userController.getUserWatchlistMovies(userId);
    } catch (error) {
      // Then
      expect(error.message).toBe(
        `No user with id : ${userId} was found`,
      );
      expect(error.statusCode).toBe(404);
    }
  });
});
