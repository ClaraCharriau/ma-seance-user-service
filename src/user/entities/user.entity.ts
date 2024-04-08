import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class User {
  @PrimaryGeneratedColumn('uuid')
  @Column({
    name: 'id_user',
  })
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
