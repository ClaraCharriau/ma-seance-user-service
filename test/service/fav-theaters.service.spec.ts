import { Test, TestingModule } from '@nestjs/testing';
import { FavTheaterService } from '../../src/user/fav-theater.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Theater } from '../../src/user/entity/theater.entity';
import { Repository } from 'typeorm';
import * as mockFavTheaters from '../mocks/favorite-theaters_200.json';
import { User } from '../../src/user/entity/user.entity';

describe('FavTheaterService', () => {
  let favTheaterService: FavTheaterService;
  let theaterRepository: Repository<Theater>;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavTheaterService,
        {
          provide: getRepositoryToken(Theater),
          useClass: Repository,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
          useValue: {},
        },
      ],
    }).compile();

    favTheaterService = module.get<FavTheaterService>(FavTheaterService);
    theaterRepository = module.get<Repository<Theater>>(
      getRepositoryToken(Theater),
    );
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should return the user favorite theaters when user have a valid id', async () => {
    // Given
    const id = 'b7d10dc9-af37-4eb1-b67d-5fe347af5682';
    jest.spyOn(theaterRepository, 'createQueryBuilder').mockReturnValue({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(mockFavTheaters),
    } as any);

    // When
    const result = await favTheaterService.getUserFavTheaters(id);

    // Then
    expect(result).toEqual(mockFavTheaters);
  });
});
