import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { AuthGuard } from '../guard/auth.gard';
import { MovieDto } from './dto/movie.dto';

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
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/:id/watchlist-movies')
  getUserWatchlistMovies(@Param('id') userId: string): Promise<MovieDto[]> {
    return this.watchlistService.getUserWatchlistMovies(userId);
  }
}
