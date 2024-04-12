import { Injectable, NotFoundException } from '@nestjs/common';
import { Theater } from './entity/theater.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TheaterDto } from './dto/theater.dto';
import { User } from './entity/user.entity';

@Injectable()
export class FavTheaterService {
  constructor(
    @InjectRepository(Theater)
    private theatersRepository: Repository<Theater>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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

  async addTheaterToUserFavorites(userId: string, theaterId: string) {
    // Get user
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Verify if theater exists
    const theater = await this.getTheaterById(theaterId);

    if (await this.existsInUserFavorites(userId, theaterId)) {
      console.error(
        `Theater with id : ${theaterId} already exists in user's favorite theaters`,
      );
      return;
    }

    // Add association between user and movie
    await this.theatersRepository
      .createQueryBuilder()
      .relation(User, 'favoriteTheaters')
      .of(user)
      .add(theater);
  }

  async removeTheaterFromUserFavorites(userId: string, theaterId: string) {
    // Get user
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Verify if theater exists
    const theater = await this.getTheaterById(theaterId);

    if (!(await this.existsInUserFavorites(userId, theaterId))) {
      throw new NotFoundException(
        `Theater with id: ${theaterId} not found in user's with id: ${userId} favorites`,
      );
    }

    // Delete association between user and theater
    await this.theatersRepository
      .createQueryBuilder()
      .relation(User, 'favoriteTheaters')
      .of(user)
      .remove(theater);
  }

  private async getTheaterById(theaterId: string): Promise<Theater> {
    const theater = await this.theatersRepository.findOneBy({ id: theaterId });
    if (!theater) {
      throw new NotFoundException(`Theater with id : ${theaterId} not found`);
    }
    return theater;
  }

  private async existsInUserFavorites(userId: string, theaterId: string) {
    const userTheater = await this.theatersRepository
      .createQueryBuilder('theater')
      .innerJoinAndSelect('theater.bookmarkedBy', 'user')
      .where('user.id_user = :userId', { userId })
      .andWhere('theater.id_theater = :theaterId', { theaterId })
      .getOne();

    return !!userTheater;
  }
}
