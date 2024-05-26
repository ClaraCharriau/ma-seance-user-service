import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistService } from '../../src/user/watchlist.service';
import { Repository } from 'typeorm';
import { Movie } from '../../src/user/entity/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as mockWatchlist from '../mocks/watchlist_200.json';
import * as mockUser from '../mocks/user_200.json';
import * as mockMovie from '../mocks/movie_200.json';
import { User } from '../../src/user/entity/user.entity';
import { NotFoundException } from '@nestjs/common';
import { MovieService } from '../../src/movie/movie.service';

describe('WatchlistService', () => {
  let watchlistService: WatchlistService;
  let moviesRepository: Repository<Movie>;
  let usersRepository: Repository<User>;

  const mockMovieOne = {
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
  };

  const mockMovieTwo = {
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
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchlistService,
        {
          provide: MovieService,
          useValue: {
            getMovie: jest
              .fn()
              .mockResolvedValueOnce(mockMovieOne)
              .mockResolvedValueOnce(mockMovieTwo),
          },
        },
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
          useValue: {
            createQuerybuilder: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          useValue: {
            createQuerybuilder: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    watchlistService = module.get<WatchlistService>(WatchlistService);
    moviesRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(watchlistService).toBeDefined();
  });

  it('should return the user watchlist when user with valid id', async () => {
    // Given
    const id = 'b7d10dc9-af37-4eb1-b67d-5fe347af5682';
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
    jest.spyOn(moviesRepository, 'createQueryBuilder').mockReturnValue({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(mockWatchlist),
    } as any);

    // When
    const result = await watchlistService.getUserWatchlistMovies(id);

    // Then
    expect(result).toEqual(watchlist);
  });

  it('should remove a movie from watchlist if it exists', async () => {});

  it('should throw NotFoundException when movie does not exist', async () => {});

  it('should throw NotFoundException when movie is not in user watchlist', async () => {});

  it('should add a movie from watchlist if it dont exists in user watchlist', async () => {});
});
