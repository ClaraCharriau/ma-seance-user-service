import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entity/user.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { Movie } from './user/entity/movie.entity';
import { Screening } from './user/entity/screening.entity';
import { Theater } from './user/entity/theater.entity';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { HttpModule } from '@nestjs/axios';

dotenv.config({ path: '.env.local' });

@Module({
  imports: [
    AuthModule,
    UserModule,
    HttpModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Movie, Screening, Theater],
      synchronize: false,
    }),
    MovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
