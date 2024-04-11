import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { WatchlistService } from '../../src/user/watchlist.service';
import * as mockWatchlist from '../mocks/watchlist_200.json';
import * as mockFavTheaters from '../mocks/favorite-theaters_200.json';
import { AuthGuard } from '../../src/guard/auth.gard';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FavTheaterService } from '../../src/user/fav-theater.service';

describe('UserController', () => {
  let userController: UserController;
  let watchlistService: WatchlistService;
  let favTheaterService: FavTheaterService;

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
            addMovieInWatchlist: jest.fn(),
          },
        },
        {
          provide: FavTheaterService,
          useValue: {
            getUserFavTheaters: jest.fn(),
            addTheaterToUserFavorites: jest.fn()
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .compile();

    userController = module.get<UserController>(UserController);
    watchlistService = module.get<WatchlistService>(WatchlistService);
    favTheaterService = module.get<FavTheaterService>(FavTheaterService);
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
    jest.spyOn(watchlistService, 'addMovieInWatchlist').mockResolvedValueOnce();

    // When
    await userController.addMovieInUserWatchlist(userId, movieId);

    // Then
    expect(watchlistService.addMovieInWatchlist).toHaveBeenCalledWith(
      userId,
      movieId,
    );
  });

  it('should return 200 when successfully get user favorite theaters', async () => {
    // Given
    const userId = '123';
    const favTheaters = [
      {
        id: '43819f64-bf0a-4ed3-807e-9ab7e05e98ed',
        name: 'MK2 Bibliothèque',
        address: '128-162 avenue de France 75013 Paris',
        imagePath: '/mk2-bibliotheque-paris',
        bookingPath: 'https://www.mk2.com/salle/mk2-bibliotheque',
      },
      {
        id: '321b3e62-0768-43ff-90aa-92d6d2c3e8a0',
        name: 'UGC Ciné Cité Strasbourg Etoile',
        address: '25, avenue du Rhin 67100 Strasbourg',
        imagePath: '/ugc-etoile-strasbourg',
        bookingPath: 'https://www.ugc.fr',
      },
      {
        id: '07b79e0e-e6e7-45b0-84b3-7e39f0b4844d',
        name: 'Star Saint-Exupery',
        address: '18, rue du 22-Novembre 67000 Strasbourg',
        imagePath: '/star-st-ex-strasbourg',
        bookingPath: 'https://www.cinema-star.com/',
      },
      {
        id: '66e71fa7-3a3a-4377-b0e8-12f36a2cc89b',
        name: 'Le Cosmos',
        address: '3, rue des Francs-Bourgeois 67000 Strasbourg',
        imagePath: '/cosmos-strasbourg',
        bookingPath: 'https://cinema-cosmos.eu',
      },
    ];
    jest
      .spyOn(favTheaterService, 'getUserFavTheaters')
      .mockResolvedValueOnce(mockFavTheaters);

    // When
    const result = await userController.getUserFavoriteTheaters(userId);

    // Then
    expect(result).toEqual(favTheaters);
  });

  it('should return 200 when successfully add theater in user favorite theaters', async () => {
    // Given
    const userId = '123';
    const theaterId = '456';
    jest.spyOn(favTheaterService, 'addTheaterToUserFavorites').mockResolvedValueOnce();

    // When
    await userController.addTheaterInUserFavorites(userId, theaterId);

    // Then
    expect(favTheaterService.addTheaterToUserFavorites).toHaveBeenCalledWith(
      userId,
      theaterId,
    );
  });
});
