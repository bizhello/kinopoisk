import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import CountriesService from '../country/country.service';
import Movies from '../entity/movies';
import SortDefaultEnum from '../enum/sortDefault.enum';
import GenresService from '../genre/genre.service';
import PaginationOptions from './dto/req/paginationOptions';
import FindAllMovies from './dto/res/findAllMovies';

@Injectable()
export default class MoviesService {
  constructor(
    @InjectRepository(Movies)
    private readonly movieRepository: Repository<Movies>,
    private readonly countriesService: CountriesService,
    private readonly genresService: GenresService,
  ) {}

  public async findAll(options: PaginationOptions): Promise<FindAllMovies> {
    const take = options.take || SortDefaultEnum.takeDefault;
    const skip = options.skip || SortDefaultEnum.skipDefault;
    const keyword = options.keyword || SortDefaultEnum.keywordDefault;
    const sort = options.sort || SortDefaultEnum.sortDefault;
    const genres = options.genres || SortDefaultEnum.genresDefault;
    const countries = options.countries || SortDefaultEnum.countriesDefault;

    const genreWords = genres.split(',');
    const genreNumbers = genreWords.map((item) => Number(item));

    const countryWords = countries.split(',');
    const countryNumbers = countryWords.map((item) => Number(item));

    const cntrs = await this.countriesService.findById(countryNumbers);
    const gnrs = await this.genresService.findById(genreNumbers);

    const [result, total] = await this.movieRepository.findAndCount({
      relations: {
        genres: true,
        countries: true,
      },
      where: {
        genres: gnrs,
        countries: cntrs,
        nameRu: ILike(`%${keyword}%`),
      },
      order: {
        nameRu: sort,
      },
      take,
      skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  public async createMoviesData(dto): Promise<void> {
    const movies = await Promise.all(
      dto.map(async (movie) => {
        const { countries, genres, ...res } = movie;

        const genresMap = await Promise.all(
          genres.map(async (el) => {
            const genre =
              (await this.genresService.findByName(el.genre)) ||
              (await this.genresService.createGenre(el.genre));

            return genre;
          }),
        );

        const countriesMap = await Promise.all(
          countries.map(async (el) => {
            const country =
              (await this.countriesService.findByName(el.country)) ||
              (await this.countriesService.createCountry(el.country));

            return country;
          }),
        );

        return this.movieRepository.save({
          ...res,
          genres: genresMap,
          countries: countriesMap,
        });
      }),
    );

    await this.movieRepository.save(movies);
  }

  public async deleteMoviesData(): Promise<void> {
    await this.movieRepository
      .createQueryBuilder('movies')
      .delete()
      .from(Movies)
      .where('id > :id', { id: 0 })
      .execute();
  }
}
