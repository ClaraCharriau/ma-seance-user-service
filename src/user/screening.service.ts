import { Injectable, NotFoundException } from '@nestjs/common';
import { Screening } from './entity/screening.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreeningDto } from './dto/screening.dto';
import { User } from './entity/user.entity';
import { MovieService } from 'src/movie/movie.service';

@Injectable()
export class ScreeningService {
  constructor(
    @InjectRepository(Screening)
    private screeningsRepository: Repository<Screening>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private movieService: MovieService
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

    return ScreeningDto.fromScreenings(screenings, this.movieService);
  }

  async addScreeningToUserAgenda(userId: string, screeningId: string) {
    // Get user
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Verify if screening exists
    const screening = await this.getScreeningById(screeningId);

    if (await this.existsInUserAgenda(userId, screeningId)) {
      console.error(
        `Screening with id : ${screeningId} already exists in user's agenda`,
      );
      return;
    }

    // Add association between user and screening
    await this.screeningsRepository
      .createQueryBuilder()
      .relation(User, 'agenda')
      .of(user)
      .add(screening);
  }

  async removeScreeningFromUserAgenda(userId: string, screeningId: string) {
    // Get user
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Verify if screening exists
    const screening = await this.getScreeningById(screeningId);

    if (!(await this.existsInUserAgenda(userId, screeningId))) {
      throw new NotFoundException(
        `Screening with id: ${screeningId} not found in user's with id: ${userId} agenda`,
      );
    }

    // Delete association between user and theater
    await this.screeningsRepository
      .createQueryBuilder()
      .relation(User, 'agenda')
      .of(user)
      .remove(screening);
  }

  private async getScreeningById(screeningId: string): Promise<Screening> {
    const screening = await this.screeningsRepository.findOneBy({
      id: screeningId,
    });
    if (!screening) {
      throw new NotFoundException(
        `Screening with id : ${screeningId} not found`,
      );
    }
    return screening;
  }

  private async existsInUserAgenda(userId: string, screeningId: string) {
    const userScreening = await this.screeningsRepository
      .createQueryBuilder('screening')
      .innerJoinAndSelect('screening.scheduledBy', 'user')
      .where('user.id_user = :userId', { userId })
      .andWhere('screening.id_screening = :screeningId', { screeningId })
      .getOne();

    return !!userScreening;
  }
}
