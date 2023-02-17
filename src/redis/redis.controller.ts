import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';

import FiltrDto from './dto/req/filtr.dto';
import PaginationDto from './dto/req/pagination.dto';
import SearchDto from './dto/req/search.dto';
import SortDto from './dto/req/sort.dto';
import RedisMovieService from './redis.service';

@Controller()
@UseInterceptors(CacheInterceptor)
export default class RedisMovieController {
  constructor(private readonly redisService: RedisMovieService) {}

  @Get('pagination')
  @CacheTTL(+process.env.REDIS_TTL)
  public async findByPagination(@Query() dto: PaginationDto) {
    return this.redisService.findByPagination(dto);
  }

  @Get('sort')
  @CacheTTL(+process.env.REDIS_TTL)
  public async findBySort(@Query() dto: SortDto) {
    return this.redisService.findBySort(dto);
  }

  @Get('search')
  @CacheTTL(+process.env.REDIS_TTL)
  public async findByName(@Query() dto: SearchDto) {
    return this.redisService.search(dto);
  }

  @Get('filtr')
  @CacheTTL(+process.env.REDIS_TTL)
  public async findByFiltr(@Query() dto: FiltrDto) {
    return this.redisService.filtr(dto);
  }
}
