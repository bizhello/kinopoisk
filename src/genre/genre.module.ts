import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import GenreEntity from '../entity/genres';
import GenresController from './genre.controller';
import GenresService from './genre.service';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [GenresService],
})
export default class GenreModule {}
