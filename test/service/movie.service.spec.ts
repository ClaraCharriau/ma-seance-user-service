import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../src/movie/movie.service';
import * as mockMovie from '../mocks/movie_200.json';
import { of } from 'rxjs';

describe('MovieService', () => {
  let movieService: MovieService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return movie data when getMovie is called successfully', async () => {
    const movieId = '3d8f1342-15f1-44b1-a48f-4581d654b94a';
    const mockMovieDto = {
      id: '3d8f1342-15f1-44b1-a48f-4581d654b94a',
      title: 'Pauvres créatures',
      releaseDate: '2024-01-17',
      duration: 90,
      resume:
        "Après s'être noyée pour échapper à son mari violent, le cerveau de Bella Baxter est remplacé par celui de son enfant à naître.",
      trailerLink: 'https://www.youtube.com/watch?v=ZGwOzkF6HjI&t=1s',
      posterLink: '/5fT98da9ccWN2xr8VOJrSBp3Cdw.jpg',
      photoLink: '/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg',
      directors: ['Yorgos Lanthimos'],
      cast: ['Emma Stone', 'Mark Ruffalo', 'Willem Dafoe'],
      genres: ['Science-Fiction', 'Comédie'],
    };
    const mockResponse = {
      data: mockMovieDto,
      status: 200,
      statusText: 'OK',
      headers: undefined,
      config: {
        url: 'http://localhost:8080/maseance/api/',
        headers: undefined,
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValueOnce(of(mockResponse));

    const result = await movieService.getMovie(movieId);
    expect(result).toEqual(mockMovie);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://localhost:8080/maseance/api/v1/movies/3d8f1342-15f1-44b1-a48f-4581d654b94a?extended_infos=true',
    );
  });
});
