import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { Movie } from "./movie.entity";
import { Theater } from "./theater.entity";
import { User } from "./user.entity";

@Entity()
export class Screening {
  @PrimaryGeneratedColumn('uuid', { name: 'id_screening' })
  id: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'id_movie' })
  movie: Movie;

  @ManyToOne(() => Theater)
  @JoinColumn({ name: 'id_theater' })
  theater: Theater;

  @ManyToMany(() => User, (user) => user.agenda)
  scheduledBy: User[];
}
