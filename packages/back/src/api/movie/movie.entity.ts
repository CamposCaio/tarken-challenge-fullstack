import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imdbID: string;

  @Column()
  title: string;

  @Column({ length: 7 })
  imdbRating: string;

  @Column({ length: 127 })
  imageSrc: string;

  @Column({ length: 127, nullable: true })
  audioSrc: string;

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
