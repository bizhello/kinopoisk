import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import CountryEntity from './countries';
import GenreEntity from './genres';

@Entity({ name: 'movies' })
export default class Movies {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    unique: true,
    nullable: true,
  })
  public kinopoiskId?: number | null;

  @Column({
    nullable: true,
  })
  public nameEn?: string | null;

  @Column({
    nullable: true,
  })
  public nameRu?: string | null;

  @Column({
    nullable: true,
  })
  public year?: number;

  @Column({
    nullable: true,
  })
  public posterUrl?: string;

  @Column({
    nullable: true,
  })
  public posterUrlPreview?: string;

  @ManyToMany(() => CountryEntity, (country) => country.movies)
  @JoinTable()
  public countries: CountryEntity[];

  @ManyToMany(() => GenreEntity, (genre) => genre.movies)
  @JoinTable()
  public genres: GenreEntity[];

  @Column({
    nullable: true,
  })
  public duration?: number;

  @Column({
    nullable: true,
  })
  public premiereRu?: string;
}
