import { Theater } from '../entity/theater.entity';

export class TheaterDto {
  id: string;
  name: string;
  address: string;
  imagePath: string;
  bookingPath: string;

  static fromTheater(theater: Theater): TheaterDto {
    let theaterDto = new TheaterDto();

    theaterDto.id = theater.id;
    theaterDto.name = theater.name;
    theaterDto.address = theater.address;
    theaterDto.imagePath = theater.imagePath;
    theaterDto.bookingPath = theater.bookingPath;
    return theaterDto;
  }

  static fromTheaters(theaters: Theater[]): TheaterDto[] {
    return theaters.map((theater) => this.fromTheater(theater));
  }
}
