import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CountryEntity from '../entity/countries';
import CountriesController from './country.controller';
import CountriesService from './country.service';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  controllers: [CountriesController],
  providers: [CountriesService],
  exports: [CountriesService],
})
export default class CountryModule {}
