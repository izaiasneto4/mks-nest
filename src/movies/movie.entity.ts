import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieGenreEnum } from './movie.types';

@Entity()
@Unique(['title'])
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  title: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  director: string;

  @Column({
    type: 'enum',
    enum: MovieGenreEnum,
    array: true,
    default: [],
  })
  genre: MovieGenreEnum[];

  @Column({ array: true })
  cast: string[];

  @CreateDateColumn()
  releaseDate: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
