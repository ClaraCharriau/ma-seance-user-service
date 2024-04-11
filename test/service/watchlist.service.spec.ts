import { Test, TestingModule } from '@nestjs/testing';
import { WatchlistService } from '../../src/user/watchlist.service';
import { Repository } from 'typeorm';
import { Movie } from '../../src/user/entity/movie.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as mockWatchlist from '../mocks/watchlist_200.json';

describe('WatchlistService', () => {
  let watchlistService: WatchlistService;
  let moviesRepository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchlistService,
        {
          provide: getRepositoryToken(Movie),
          useClass: Repository,
          useValue: {
            createQuerybuilder: jest.fn(),
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
        id: 'f1545604-573e-4d46-9644-0279b1967e2c',
        tmdbId: '437342',
      },
      {
        id: 'b90c3b68-cb48-47bb-bbe9-66b2b594e9f2',
        tmdbId: '1125311',
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
});
