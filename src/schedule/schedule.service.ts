import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { catchError, firstValueFrom } from 'rxjs';

import MoviesService from '../movie/movie.service';

@Injectable()
export default class ScheduleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly moviesService: MoviesService,
  ) {}

  public monthPremier = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];

  public async findAll(): Promise<void> {
    const dataNow = new Date();
    const countMonthPremier = dataNow.getMonth();
    const yearPremier = dataNow.getFullYear();

    const { data } = await firstValueFrom(
      this.httpService
        .get<any>(
          `${process.env.SCHEDULER_HOST}year=${yearPremier}&month=${this.monthPremier[countMonthPremier]}`,
          {
            headers: {
              'X-API-KEY': process.env.SCHEDULER_HEADERS,
              'Content-Type': 'application/json',
            },
          },
        )
        .pipe(
          catchError((error) => {
            console.log(error.response.data, 'tut');
            throw 'An error happened!';
          }),
        ),
    );

    const movies = data.items;
    await this.moviesService.createMoviesData(movies);
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  public async changeDbFilms() {
    await this.moviesService.deleteMoviesData();
    await this.findAll();
  }
}
