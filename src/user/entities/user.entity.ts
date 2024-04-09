import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', {name: 'id_user'})
  id: string;

  @Column({
    length: 100,
  })
  pseudo: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
