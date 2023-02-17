import { Controller, Get, Query } from '@nestjs/common';

import PaginationOptions from './dto/req/paginationOptions';
import FindAllMovies from './dto/res/findAllMovies';
import MoviesService from './movie.service';

@Controller('movies')
export default class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  public async findAll(
    @Query() dto: PaginationOptions,
  ): Promise<FindAllMovies> {
    return this.movieService.findAll(dto);
  }
}
