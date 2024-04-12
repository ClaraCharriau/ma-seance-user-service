import { Screening } from '../entity/screening.entity';
import { MovieDto } from './movie.dto';
import { TheaterDto } from './theater.dto';

export class ScreeningDto {
  id: string;
  date: Date;
  movie: MovieDto;
  theater: TheaterDto;

  static fromScreening(screening: Screening) {
    let screeningDto = new ScreeningDto();

    screeningDto.id = screening.id;
    screeningDto.date = new Date(screening.date);
    screeningDto.movie = screening.movie;
    screeningDto.theater = screening.theater;
    return screeningDto;
  }

  static fromScreenings(screenings: Screening[]) {
    return screenings.map((screening) => this.fromScreening(screening));
  }
}
