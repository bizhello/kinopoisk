import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Countries from '../entity/countries';
import Genres from '../entity/genres';
import Movies from '../entity/movies';
import MovieModule from '../movie/movie.module';
import ScheduleService from './schedule.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Movies, Genres, Countries]),
    MovieModule,
  ],
  providers: [ScheduleService],
})
export default class ScheduleModuleFilms {}
