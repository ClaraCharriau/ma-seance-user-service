import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Movie } from './entities/movie.entity';
import { Screening } from './entities/screening.entity';
import { Theater } from './entities/theater.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie, Screening, Theater])],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
