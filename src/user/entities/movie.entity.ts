import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryColumn('uuid', { name: 'id_movie' })
  id: string;

  @Column({ length: 12, unique: true, name: 'id_tmdb' })
  tmdbId: string;
}
