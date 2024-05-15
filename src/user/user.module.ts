import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from 'src/movie/movie.service';
import { Movie } from './entity/movie.entity';
import { Screening } from './entity/screening.entity';
import { Theater } from './entity/theater.entity';
import { User } from './entity/user.entity';
import { FavTheaterService } from './fav-theater.service';
import { ScreeningService } from './screening.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WatchlistService } from './watchlist.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([User, Movie, Screening, Theater]),
  ],
  providers: [
    UserService,
    WatchlistService,
    FavTheaterService,
    ScreeningService,
    MovieService,
  ],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
})
export class UserModule {}
