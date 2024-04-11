import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';

@Controller('v1/users')
export class UserController {
  constructor(private watchlistService: WatchlistService) {}

  /**
   * GET /users/{id}/fav-movies
   * will receive the user's id by param
   * and will return a list of user's favorite movies
   *
   * @param userId
   * @returns Promise<MovieDto[]>
   */
  @HttpCode(HttpStatus.OK)
  @Get('/:id/watchlist-movies')
  getUserWatchlistMovies(@Param('id') userId: string)
  //: Promise<MovieDto[]> 
  {
    return this.watchlistService.getUserWatchlistMovies(userId);
  }
}
