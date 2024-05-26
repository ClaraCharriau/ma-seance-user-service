import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../src/user/user.controller';
import { WatchlistService } from '../../src/user/watchlist.service';
import * as mockWatchlist from '../mocks/watchlist_200.json';
import * as mockFavTheaters from '../mocks/favorite-theaters_200.json';
import { AuthGuard } from '../../src/guard/auth.gard';
import { CanActivate } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FavTheaterService } from '../../src/user/fav-theater.service';
import { ScreeningService } from '../../src/user/screening.service';

describe('UserController', () => {
  let userController: UserController;
  let watchlistService: WatchlistService;
  let favTheaterService: FavTheaterService;
  let screeningService: ScreeningService;

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
            addTheaterToUserFavorites: jest.fn(),
            removeTheaterFromUserFavorites: jest.fn(),
          },
        },
        {
          provide: ScreeningService,
          useValue: {
            getUserAgenda: jest.fn(),
            addScreeningToUserAgenda: jest.fn(),
            removeScreeningFromUserAgenda: jest.fn(),
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
    screeningService = module.get<ScreeningService>(ScreeningService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should return 200 when successfully get user watchlist', async () => {
    // Given
    const userId = '123';
    const watchlist = [
      {
        id: 'cff01b1b-a943-4bcf-a396-afd80417150a',
        title: 'Dune',
        releaseDate: '2024-03-31',
        duration: 166,
        resume:
          "Paul Atréides se rallie à Chani et aux Fremen tout en préparant sa revanche contre ceux qui ont détruit sa famille. Alors qu'il doit faire un choix entre l'amour de sa vie et le destin de la galaxie, il devra néanmoins tout faire pour empêcher un terrible futur que lui seul peut prédire.",
        trailerLink: '',
        posterLink: '/qpyaW4xUPeIiYA5ckg5zAZFHvsb.jpg',
        photoLink: '',
        directors: ['Denis Villeneuve'],
        cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
        genres: ['Drame', 'Science-Fiction'],
      },
      {
        id: 'dd4cdbd2-44b7-4fb4-84b4-4f016d379ddb',
        title: 'The Grand Budapest Hotel',
        releaseDate: '2014-02-26',
        duration: 100,
        resume:
          'Pendant l’entre‐deux guerres, le légendaire concierge d’un grand hôtel et son jeune protégé se retrouvent impliqués dans une histoire mêlant le vol d’un tableau de la Renaissance, la bataille pour une énorme fortune familiale, et le lent puis soudain bouleversement qui transforme l’Europe en cette première moitié de XXème siècle.',
        trailerLink: '',
        posterLink: '/atLMzzA7pOB0BdfM89V7BbdtLN6.jpg',
        photoLink: '/xHDynIimfsgj0ZOs0j5ma8v1vmM.jpg',
        directors: ['Wes Anderson'],
        cast: ['Ralph Fiennes', 'Zendaya', 'Rebecca Ferguson'],
        genres: ['Comédie', 'Drame'],
      },
    ];
    jest
      .spyOn(watchlistService, 'getUserWatchlistMovies')
      .mockResolvedValueOnce(mockWatchlist);

    // When
    const result = await userController.getUserWatchlistMovies(userId);

    // Then
    expect(result.records).toEqual(watchlist);
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
    jest
      .spyOn(favTheaterService, 'addTheaterToUserFavorites')
      .mockResolvedValueOnce();

    // When
    await userController.addTheaterInUserFavorites(userId, theaterId);

    // Then
    expect(favTheaterService.addTheaterToUserFavorites).toHaveBeenCalledWith(
      userId,
      theaterId,
    );
  });

  it('should return 200 when successfully delete theater in user favorite theaters', async () => {
    // Given
    const userId = '123';
    const theaterId = '456';
    jest
      .spyOn(favTheaterService, 'removeTheaterFromUserFavorites')
      .mockResolvedValueOnce();

    // When
    await userController.deleteTheaterFromUserFavorites(userId, theaterId);

    // Then
    expect(favTheaterService.removeTheaterFromUserFavorites).toHaveBeenCalled();
  });

  it('should return 200 when successfully get user agenda', async () => {
    // Given
    const userId = '123';
    const screenings = [
      {
        id: '07e4c502-741f-4455-b54a-890a2951c65d',
        schedule: {
          date: new Date('2024-04-14T19:15:00.000Z'),
          dayName: 'dimanche',
          dayNumber: '17',
          month: 'mars',
          year: '2024',
          hourly: '11:45',
        },
        movie: {
          id: 'cff01b1b-a943-4bcf-a396-afd80417150a',
          title: 'Dune',
          releaseDate: '2024-03-31',
          duration: 166,
          resume:
            "Paul Atréides se rallie à Chani et aux Fremen tout en préparant sa revanche contre ceux qui ont détruit sa famille. Alors qu'il doit faire un choix entre l'amour de sa vie et le destin de la galaxie, il devra néanmoins tout faire pour empêcher un terrible futur que lui seul peut prédire.",
          trailerLink: '',
          posterLink: '/qpyaW4xUPeIiYA5ckg5zAZFHvsb.jpg',
          photoLink: '',
          directors: ['Denis Villeneuve'],
          cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
          genres: ['Drame', 'Science-Fiction'],
        },
        theater: {
          id: '20cd8109-efaf-472b-aa58-9e38afcdde36',
          name: 'C2L Saint-Germain',
          address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
          imagePath: '/c2l-saint-germain',
          bookingPath: 'https://www.ugc.fr',
        },
      },
      {
        id: '9e1d4a7d-5b14-41d9-af63-8d4f032da07d',
        schedule: {
          date: new Date('2024-04-14T19:15:00.000Z'),
          dayName: 'dimanche',
          dayNumber: '17',
          month: 'mars',
          year: '2024',
          hourly: '11:45',
        },
        movie: {
          id: '3d8f1342-15f1-44b1-a48f-4581d654b94a',
          title: 'Pauvres créatures',
          releaseDate: '2024-01-17',
          duration: 90,
          resume:
            "Après s'être noyée pour échapper à son mari violent, le cerveau de Bella Baxter est remplacé par celui de son enfant à naître.",
          trailerLink: 'https://www.youtube.com/watch?v=ZGwOzkF6HjI&t=1s',
          posterLink: '/5fT98da9ccWN2xr8VOJrSBp3Cdw.jpg',
          photoLink: '/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg',
          directors: ['Yorgos Lanthimos'],
          cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe'],
          genres: ['Science-Fiction', 'Comédie'],
        },
        theater: {
          id: 'cf21273d-1c18-47c6-a3cf-6868e19e826f',
          name: 'Elysées Lincoln',
          address: '14 Rue Lincoln 75008 Paris',
          imagePath: '/lincoln-paris',
          bookingPath: 'https://www.lelincoln.com',
        },
      },
    ];
    jest
      .spyOn(screeningService, 'getUserAgenda')
      .mockResolvedValueOnce(screenings);

    // When
    const result = await userController.getUserAgenda(userId);

    // Then
    expect(result).toEqual(screenings);
  });

  it('should return 200 when successfully add new showtime to user agenda', async () => {
    // Given
    const userId = '123';
    const screeningId = '07e4c502-741f-4455-b54a-890a2951c65d';
    jest
      .spyOn(screeningService, 'addScreeningToUserAgenda')
      .mockResolvedValueOnce();

    // When
    const result = await userController.addToUserAgenda(userId, screeningId);

    // Then
    expect(screeningService.addScreeningToUserAgenda).toHaveBeenCalled();
  });

  it('should return 200 when successfully delete movie in user watchlist', async () => {
    // Given
    const userId = '123';
    const screeningId = '456';
    jest
      .spyOn(screeningService, 'removeScreeningFromUserAgenda')
      .mockResolvedValueOnce();

    // When
    await userController.deleteScreeningFromUserFavorites(userId, screeningId);

    // Then
    expect(screeningService.removeScreeningFromUserAgenda).toHaveBeenCalled();
  });
});
