import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  /**
   * SELECT *
   * FROM movie
   * INNER JOIN movie_watchlist user_movie ON movie.id_movie = user_movie.id_movie
   * INNER JOIN "user" user ON user.id_user = user_movie.id_user
   * WHERE user.id_user = :userId
   */
  async getUserWatchlistMovies(userId: string): Promise<MovieDto[]> {
    const movies: Movie[] = await this.moviesRepository
    .createQueryBuilder('movie')
    .innerJoin('movie.watchlistedBy', 'user')
    .where('user.id_user = :userId', { userId })
    .getMany();

    return MovieDto.fromMovies(movies);
  }
}
