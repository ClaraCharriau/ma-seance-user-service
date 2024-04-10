import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Movie } from './user/entities/movie.entity';
import { Screening } from './user/entities/screening.entity';
import { Theater } from './user/entities/theater.entity';

dotenv.config({ path: '.env.local' });

@Module({
  imports: [
    AuthModule,
    UserModule,
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
