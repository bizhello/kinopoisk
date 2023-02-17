import { Controller, Get } from '@nestjs/common';

import CountryEntity from '../entity/countries';
import CountriesService from './country.service';

@Controller('countries')
export default class CountriesController {
  constructor(private readonly countryService: CountriesService) {}

  @Get()
  public async findAll(): Promise<CountryEntity[]> {
    return this.countryService.findAll();
  }
}
