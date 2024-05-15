import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import * as dotenv from 'dotenv';
import { catchError, firstValueFrom } from 'rxjs';
import { MovieDto } from 'src/user/dto/movie.dto';

dotenv.config({ path: '.env.local' });

@Injectable()
export class MovieService {
  constructor(private readonly httpService: HttpService) {}
  private readonly logger = new Logger(MovieService.name);

  async getMovie(movieId: string): Promise<MovieDto> {
    const url =
      process.env.MA_SEANCE_SCREENING_API_PATH + '/v1/movies/' + movieId + "?extended_infos=true";

    const { data } = await firstValueFrom(
      this.httpService.get<MovieDto>(url).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
