import { MovieService } from 'src/movie/movie.service';
import { Screening } from '../entity/screening.entity';
import { MovieDto } from './movie.dto';
import { TheaterDto } from './theater.dto';
import { ScheduleDto } from './schedule.dto';

export class ScreeningDto {
  id: string;
  schedule: ScheduleDto;
  movie: MovieDto;
  theater: TheaterDto;

  static async fromScreening(screening: Screening, movieService: MovieService) {
    let screeningDto = new ScreeningDto();

    const movieDto = await movieService.getMovie(screening.movie.id);

    screeningDto.id = screening.id;
    screeningDto.schedule = ScheduleDto.fromDate(screening.date);
    screeningDto.movie = movieDto;
    screeningDto.theater = screening.theater;
    return screeningDto;
  }

  static async fromScreenings(
    screenings: Screening[],
    movieService: MovieService,
  ) {
    return Promise.all(
      screenings.map((screening) =>
        this.fromScreening(screening, movieService),
      ),
    );
  }
}
