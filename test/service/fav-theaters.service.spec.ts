import { Test, TestingModule } from '@nestjs/testing';
import { FavTheaterService } from 'src/user/fav-theater.service';

describe('FavTheaterService', () => {
  let service: FavTheaterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavTheaterService],
    }).compile();

    service = module.get<FavTheaterService>(FavTheaterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
