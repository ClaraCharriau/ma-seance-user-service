import { Injectable } from '@nestjs/common';
import { Theater } from './entity/theater.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TheaterDto } from './dto/theater.dto';

@Injectable()
export class FavTheaterService {
  constructor(
    @InjectRepository(Theater)
    private theatersRepository: Repository<Theater>,
  ) {}

  /**
   * SELECT *
   * FROM theater
   * INNER JOIN theater_bookmar user_theater ON theater.id_theater = user_theater.id_theater
   * INNER JOIN "user" user ON user.id_user = user_theater.id_user
   * WHERE user.id_user = :userId
   */
  async getUserFavTheaters(userId: string): Promise<TheaterDto[]> {
    const theaters: Theater[] = await this.theatersRepository
      .createQueryBuilder('theater')
      .innerJoin('theater.bookmarkedBy', 'user')
      .where('user.id_user = :userId', { userId })
      .getMany();

    return TheaterDto.fromTheaters(theaters);
  }
}
