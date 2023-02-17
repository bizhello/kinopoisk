import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import Countries from '../entity/countries';
import Genres from '../entity/genres';
import Movies from '../entity/movies';
import SortDefaultEnum from '../enum/sortDefault.enum';
import IDataMovie from '../interfaces/dataMovie.interface';
import FindAllMovies from '../movie/dto/res/findAllMovies';
import FiltrDto from './dto/req/filtr.dto';
import PaginationDto from './dto/req/pagination.dto';
import SearchDto from './dto/req/search.dto';
import SortDto from './dto/req/sort.dto';

@Injectable()
export default class RedisMovieService {
  constructor(
    @InjectRepository(Movies)
    private readonly movieRepository: Repository<Movies>,
    @InjectRepository(Countries)
    private readonly countryRepository: Repository<Countries>,
    @InjectRepository(Genres)
    private readonly genreRepository: Repository<Genres>,
  ) {}

  public async findByPagination(dto: PaginationDto): Promise<FindAllMovies> {
    const take = dto.take || SortDefaultEnum.takeDefault;
    const skip = dto.skip || SortDefaultEnum.skipDefault;

    const [result, total] = await this.movieRepository.findAndCount({
      relations: {
        genres: true,
        countries: true,
      },
      take,
      skip,
    });

    const pagMovies = {
      data: result,
      count: total,
    };

    return pagMovies;
  }

  public async findBySort(dto: SortDto): Promise<IDataMovie[]> {
    const sort = dto.sort || SortDefaultEnum.sortDefault;

    const movies = await this.movieRepository.find({
      order: {
        nameRu: sort,
      },
    });

    return movies;
  }

  public async search(dto: SearchDto): Promise<IDataMovie[]> {
    const { keyword } = dto;

    const movies = await this.movieRepository.find({
      relations: {
        genres: true,
        countries: true,
      },
      where: {
        nameRu: ILike(`%${keyword}%`),
      },
    });

    return movies;
  }

  public async filtr(dto: FiltrDto): Promise<IDataMovie[]> {
    const genres = dto.genres || SortDefaultEnum.genresDefault;
    const countries = dto.countries || SortDefaultEnum.countriesDefault;

    const genreWords = genres.split(',');
    const genreNumbers = genreWords.map((item) => Number(item));

    const countryWords = countries.split(',');
    const countryNumbers = countryWords.map((item) => Number(item));

    const cntrs = await this.countryRepository.findBy({
      id: In(countryNumbers),
    });
    const gnrs = await this.genreRepository.findBy({
      id: In(genreNumbers),
    });

    const movies = await this.movieRepository.find({
      relations: {
        genres: true,
        countries: true,
      },
      where: {
        genres: gnrs,
        countries: cntrs,
      },
    });

    return movies;
  }
}
