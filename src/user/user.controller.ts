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
import { TheaterDto } from './dto/theater.dto';
import { FavTheaterService } from './fav-theater.service';
import { ScreeningDto } from './dto/screening.dto';
import { ScreeningService } from './screening.service';

@Controller('v1/users')
export class UserController {
  constructor(
    private watchlistService: WatchlistService,
    private favTheaterService: FavTheaterService,
    private screeningService: ScreeningService,
  ) {}

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
  async getUserWatchlistMovies(@Param('userId') userId: string) {
    const movies = await this.watchlistService.getUserWatchlistMovies(userId);
    return {
      _metadata: {
        total_count: movies.length,
      },
      records: movies
    };
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
   * and will add the movie to the list of user's favorite movies
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

  /**
   * GET /users/{id}/favorite-theaters
   * will receive the user's id by param
   * and will return a list of the user's favorite theaters
   *
   * @param userId
   * @returns Promise<TheaterDto[]>
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:userId/favorite-theaters')
  getUserFavoriteTheaters(
    @Param('userId') userId: string,
  ): Promise<TheaterDto[]> {
    return this.favTheaterService.getUserFavTheaters(userId);
  }

  /**
   * POST /users/{userId}/favorite-theaters/{theaterId}
   * will receive the user's and theater's id by param
   * and will add the theater to the list of user's favorite theaters
   *
   * @param userId
   * @param theaterId
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/:userId/favorite-theaters/:theaterId')
  addTheaterInUserFavorites(
    @Param('userId') userId: string,
    @Param('theaterId') theaterId: string,
  ): Promise<void> {
    return this.favTheaterService.addTheaterToUserFavorites(userId, theaterId);
  }

  /**
   * DELETE /users/{userId}/favorite-theaters/{theaterId}
   * will receive the user's and theater's id by param
   * and will delete the list of user's favorite theaters
   *
   * @param userId
   * @param theaterId
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId/favorite-theaters/:theaterId')
  deleteTheaterFromUserFavorites(
    @Param('userId') userId: string,
    @Param('theaterId') theaterId: string,
  ): Promise<void> {
    return this.favTheaterService.removeTheaterFromUserFavorites(
      userId,
      theaterId,
    );
  }

  /**
   * GET /users/{userId}/screenings
   * will receive the user's id by param
   * and will return user's agenda
   *
   * @param userId
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:userId/screenings')
  getUserAgenda(@Param('userId') userId: string): Promise<ScreeningDto[]> {
    return this.screeningService.getUserAgenda(userId);
  }

  /**
   * POST /users/{userId}/screenings/{screeningId}
   * will receive the user's and screening's id by param
   * and will add the screening to user's agenda
   *
   * @param userId
   * @param screeningId
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/:userId/screenings/:screeningId')
  addToUserAgenda(
    @Param('userId') userId: string,
    @Param('screeningId') screeningId: string,
  ): Promise<void> {
    return this.screeningService.addScreeningToUserAgenda(userId, screeningId);
  }

  /**
   * DELETE /users/{userId}/screenings/{screeningId}
   * will receive the user's and screening's id by param
   * and will delete the screening in the user's agenda
   *
   * @param userId
   * @param screeningId
   */
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:userId/screenings/:screeningId')
  deleteScreeningFromUserFavorites(
    @Param('userId') userId: string,
    @Param('screeningId') screeningId: string,
  ): Promise<void> {
    return this.screeningService.removeScreeningFromUserAgenda(
      userId,
      screeningId,
    );
  }
}
