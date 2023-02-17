import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import MovieEntity from './movies';

@Entity({ name: 'genres' })
export default class Genres {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public title: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.genres, { cascade: true })
  public movies: MovieEntity[];
}
