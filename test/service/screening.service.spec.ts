import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieService } from '../../src/movie/movie.service';
import { Screening } from '../../src/user/entity/screening.entity';
import { User } from '../../src/user/entity/user.entity';
import { ScreeningService } from '../../src/user/screening.service';

describe('ScreeningService tests', () => {
  let screeningService: ScreeningService;
  let screeningsRepository: Repository<Screening>;

  const mockMovie = {
    id: '3e07de0f-f2c8-4c46-9ac9-744abb8af481',
    title: 'Your Name.',
    releaseDate: '2016-12-28',
    duration: 107,
    resume: 'Super résumé',
    trailerLink: '',
    posterLink: '/zyHjvVRgKOt9wgVx4ikp2kGArGF.jpg',
    photoLink: '/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg',
    directors: ['Makoto Shinkai'],
    cast: ['Ryunosuke Kamiki', 'Mone Kamishiraishi', 'Ryo Narita'],
    genres: ['Animation', 'Romance'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScreeningService,
        {
          provide: MovieService,
          useValue: {
            getMovie: jest.fn().mockResolvedValue(mockMovie),
          },
        },
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
    screeningsRepository = module.get<Repository<Screening>>(
      getRepositoryToken(Screening),
    );
  });

  it('should return the user agenda when user have a valid id', async () => {
    // Given
    const agenda = [
      {
        id: '07e4c502-741f-4455-b54a-890a2951c65d',
        date: new Date('2024-04-10T16:00:00'),
        movie: {
          id: '3e07de0f-f2c8-4c46-9ac9-744abb8af481',
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
    const agendaDto = [
      {
        id: '07e4c502-741f-4455-b54a-890a2951c65d',
        schedule: {
          date: new Date('2024-04-10T16:00:00'),
          dayName: 'mercredi',
          dayNumber: '10',
          hourly: '16:00',
          month: 'avril',
          year: '2024',
        },
        movie: {
          id: '3e07de0f-f2c8-4c46-9ac9-744abb8af481',
          title: 'Your Name.',
          releaseDate: '2016-12-28',
          duration: 107,
          resume: 'Super résumé',
          trailerLink: '',
          posterLink: '/zyHjvVRgKOt9wgVx4ikp2kGArGF.jpg',
          photoLink: '/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg',
          directors: ['Makoto Shinkai'],
          cast: ['Ryunosuke Kamiki', 'Mone Kamishiraishi', 'Ryo Narita'],
          genres: ['Animation', 'Romance'],
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
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue(agenda),
    } as any);

    // When
    const result = await screeningService.getUserAgenda(id);

    // Then
    expect(result).toEqual(agendaDto);
  });
});
