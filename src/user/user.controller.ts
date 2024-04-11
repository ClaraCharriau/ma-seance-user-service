import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { AuthGuard } from '../guard/auth.gard';
import { MovieDto } from './dto/movie.dto';

@Controller('v1/users')
export class UserController {
  constructor(private watchlistService: WatchlistService) {}

  /**
   * GET /users/{id}/watchlist-movies
   * will receive the user's id by param
   * and will return a list of user's favorite movies
   *
   * @param userId
   * @returns Promise<MovieDto[]>
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:userId/watchlist-movies')
  getUserWatchlistMovies(@Param('userId') userId: string): Promise<MovieDto[]> {
    return this.watchlistService.getUserWatchlistMovies(userId);
  }

  /**
   * DELETE /users/{userId}/watchlist-movies/{movieId}
   * will receive the user's and movie's id by param
   * and will delete the list of user's favorite movies
   *
   * @param userId
   * @param movieId
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId/watchlist-movies/:movieId')
  deleteMovieFromUserWatchlist(
    @Param('userId') userId: string,
    @Param('movieId') movieId: string,
  ): Promise<void> {
    return this.watchlistService.removeMovieFromWatchlist(userId, movieId);
  }

  /**
   * POST /users/{userId}/watchlist-movies/{movieId}
   * will receive the user's and movie's id by param
   * and will delete the list of user's favorite movies
   *
   * @param userId
   * @param movieId
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/:userId/watchlist-movies/:movieId')
  addMovieInUserWatchlist(
    @Param('userId') userId: string,
    @Param('movieId') movieId: string,
  ): Promise<void> {
    return this.watchlistService.addMovieInWatchlist(userId, movieId);
  }
}
