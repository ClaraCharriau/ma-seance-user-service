import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Movie } from './entity/movie.entity';
import { Screening } from './entity/screening.entity';
import { Theater } from './entity/theater.entity';
import { UserController } from './user.controller';
import { WatchlistService } from './watchlist.service';
import { FavTheaterService } from './fav-theater.service';
import { ScreeningService } from './screening.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie, Screening, Theater])],
  providers: [UserService, WatchlistService, FavTheaterService, ScreeningService],
  exports: [TypeOrmModule, UserService],
  controllers: [UserController],
})
export class UserModule {}
