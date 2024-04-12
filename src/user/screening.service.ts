import { Injectable } from '@nestjs/common';
import { Screening } from './entity/screening.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreeningDto } from './dto/screening.dto';

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(Screening)
    private screeningsRepository: Repository<Screening>,
  ) {}

  /**
   * SELECT *
   * FROM screening
   * INNER JOIN agenda user_screening ON screening.id_screening = user_screening.id_screening
   * INNER JOIN "user" user ON user.id_user = user_screening.id_user
   * WHERE user.id_user = :userId
   */
  async getUserAgenda(userId: string): Promise<ScreeningDto[]> {
    const screenings: Screening[] = await this.screeningsRepository
      .createQueryBuilder('screening')
      .innerJoin('screening.scheduledBy', 'user')
      .where('user.id_user = :userId', { userId })
      .leftJoinAndSelect('screening.movie', 'movie')
      .leftJoinAndSelect('screening.theater', 'theater')
      .getMany();

    return ScreeningDto.fromScreenings(screenings);
  }
}
