import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';

import Countries from '../entity/countries';
import Genres from '../entity/genres';
import Movies from '../entity/movies';
import RedisMovieController from './redis.controller';
import RedisMovieService from './redis.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Movies, Genres, Countries]),
  ],
  controllers: [RedisMovieController],
  providers: [RedisMovieService],
})
export default class RedisMovieModule {}
