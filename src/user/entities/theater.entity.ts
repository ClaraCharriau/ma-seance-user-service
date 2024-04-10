import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn('uuid', { name: 'id_theater' })
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 255, nullable: true, name: 'image_path' })
  imagePath: string;

  @Column({ length: 255, name: 'booking_path' })
  bookingPath: string;
}
