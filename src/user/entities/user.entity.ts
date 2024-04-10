import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
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

  @ManyToMany(() => Movie)
  @JoinTable()
  watchlist: Movie[];

  @ManyToMany(() => Screening)
  @JoinTable()
  agenda: Screening[];

  @ManyToMany(() => Theater)
  @JoinTable({
    name: 'theater_bookmark',
  })
  favoriteTheaters: Theater[];
}
