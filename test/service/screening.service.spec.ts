import { Test, TestingModule } from '@nestjs/testing';
import { ScreeningService } from '../../src/user/screening.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Screening } from '../../src/user/entity/screening.entity';
import { Repository } from 'typeorm';
import { User } from '../../src/user/entity/user.entity';

describe('ScreeningService tests', () => {
  let screeningService: ScreeningService;
  let screeningsRepository: Repository<Screening>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScreeningService,
        {
          provide: getRepositoryToken(Screening),
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

    screeningService = module.get<ScreeningService>(ScreeningService);
    screeningsRepository = module.get<Repository<Screening>>(getRepositoryToken(Screening));
  });

  it('should return the user agenda when user have a valid id', async () => {
    // Given
    const agenda = [
      {
        id: '07e4c502-741f-4455-b54a-890a2951c65d',
        date: new Date('2024-04-10T16:00:00.000Z'),
        movie: {
          id: '0d1aef7d-d76a-4d14-9461-d6470b7c4de9',
          tmdbId: '1011985',
        },
        theater: {
          id: '20cd8109-efaf-472b-aa58-9e38afcdde36',
          name: 'C2L Saint-Germain',
          address: '25-27-29, rue du Vieux-Marche 78100 Saint-Germain-en-Laye',
          imagePath: '/c2l-saint-germain',
          bookingPath: 'https://www.ugc.fr',
        },
      },
    ];

    const id = 'b7d10dc9-af37-4eb1-b67d-5fe347af5682';
    jest.spyOn(screeningsRepository, 'createQueryBuilder').mockReturnValue({
      innerJoin: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(agenda),
    } as any);

    // When
    const result = await screeningService.getUserAgenda(id);

    // Then
    expect(result).toEqual(agenda);
  });
});
