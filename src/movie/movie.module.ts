import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CountryModule from '../country/country.module';
import Movies from '../entity/movies';
import GenreModule from '../genre/genre.module';
import MoviesController from './movie.controller';
import MoviesService from './movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movies]), CountryModule, GenreModule],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export default class MovieModule {}
