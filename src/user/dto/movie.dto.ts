import { Movie } from "../entity/movie.entity";

export class MovieDto {
    id: string;
    tmdbId: string;

    static fromMovie(movie: Movie): MovieDto {
        let movieDto = new MovieDto();

        movieDto.id = movie.id;
        movieDto.tmdbId = movie.tmdbId;
        return movieDto;
    }

    static fromMovies(movies: Movie[]): MovieDto[] {
        return movies.map(movie => this.fromMovie(movie));
    }
}