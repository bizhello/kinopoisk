import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import MovieEntity from './movies';

@Entity({ name: 'countries' })
export default class Countries {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public title: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.countries, { cascade: true })
  public movies: MovieEntity[];
}
