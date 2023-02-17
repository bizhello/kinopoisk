import { Controller, Get } from '@nestjs/common';

import GenresService from './genre.service';

@Controller('genres')
export default class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Get()
  public async findAll() {
    return this.genreService.findAll();
  }
}
