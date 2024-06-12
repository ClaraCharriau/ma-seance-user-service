import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from '../movie/movie.service';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entity/movie.entity';
import { User } from './entity/user.entity';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private movieService: MovieService,
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

    return this.buildMovieDtoList(movies);
  }

  async removeMovieFromWatchlist(userId: string, movieId: string) {
    // Get user
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Verify if movie exists
    const movie = await this.getMovieById(movieId);

    // Check if already exists in watchlist
    if (!(await this.existsInUserWatchlist(userId, movieId))) {
      throw new NotFoundException(
        `Movie with id : ${movieId} not found in user's with id: ${userId} watchlist`,
      );
    }

    // Delete association between user and movie
    await this.moviesRepository
      .createQueryBuilder()
      .relation(User, 'watchlist')
      .of(user)
      .remove(movie);
  }

  async addMovieInWatchlist(userId: string, movieId: string) {
    // Get user
    const user = await this.usersRepository.findOneBy({ id: userId });

    // Verify if movie exist
    const movie = await this.getMovieById(movieId);

    // Check if already exists in watchlist
    if (await this.existsInUserWatchlist(userId, movieId)) {
      console.error(
        `Movie with id : ${movieId} already exists in user watchlist`,
      );
      return;
    }

    // Add association between user and movie
    await this.moviesRepository
      .createQueryBuilder()
      .relation(User, 'watchlist')
      .of(user)
      .add(movie);
  }

  private async existsInUserWatchlist(userId: string, movieId: string) {
    const userMovie = await this.moviesRepository
      .createQueryBuilder('movie')
      .innerJoinAndSelect('movie.watchlistedBy', 'user')
      .where('user.id_user = :userId', { userId })
      .andWhere('movie.id_movie = :movieId', { movieId })
      .getOne();

    return !!userMovie;
  }

  private async getMovieById(movieId: string): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id: movieId });
    if (!movie) {
      throw new NotFoundException(`Movie with id : ${movieId} not found`);
    }
    return movie;
  }

  private async buildMovieDtoList(movies: Movie[]): Promise<MovieDto[]> {
    const movieDtoList: MovieDto[] = [];
    for (const movie of movies) {
      const movieDto = await this.movieService.getMovie(movie.id);
      movieDtoList.push(movieDto);
    }
    return movieDtoList;
  }
}
