import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import CountryModule from './country/country.module';
import GenreModule from './genre/genre.module';
import MovieModule from './movie/movie.module';
import RedisMovieModule from './redis/redis.module';
import ScheduleModuleFilms from './schedule/schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: false,
      logging: false,
      entities: [`${__dirname}/entity/*{.ts,.js}`],
      migrations: [`${__dirname}/migration/*{.ts,.js}`],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ScheduleModule.forRoot(),
    ScheduleModuleFilms,
    MovieModule,
    GenreModule,
    CountryModule,
    RedisMovieModule,
  ],
})
export default class AppModule {}
