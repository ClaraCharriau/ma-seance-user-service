import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Screening } from './screening.entity';
import { Theater } from './theater.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id_user' })
  id: string;

  @Column({
    length: 100,
  })
  pseudo: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Movie, (movie) => movie.watchlistedBy, { cascade: true })
  @JoinTable({
    name: 'movie_watchlist',
    joinColumn: {
      name: 'id_user',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_movie',
      referencedColumnName: 'id',
    },
  })
  watchlist: Movie[];

  @ManyToMany(() => Screening)
  @JoinTable({
    name: 'agenda',
  })
  agenda: Screening[];

  @ManyToMany(() => Theater)
  @JoinTable({
    name: 'theater_bookmark',
  })
  favoriteTheaters: Theater[];
}
