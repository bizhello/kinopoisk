import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import CountryEntity from '../entity/countries';

@Injectable()
export default class CountriesService {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly repository: Repository<CountryEntity>,
  ) {}

  public async createCountry(dto: string): Promise<CountryEntity> {
    try {
      return this.repository.save({
        title: dto,
      });
    } catch {
      throw new Error('Ошибка во время создания старны');
    }
  }

  public async findAll(): Promise<CountryEntity[]> {
    try {
      return this.repository.find();
    } catch {
      throw new Error('Ошибка во время поиска старн');
    }
  }

  public async findByName(dto: string): Promise<CountryEntity> {
    try {
      return this.repository.findOneBy({
        title: dto,
      });
    } catch {
      throw new Error('Ошибка во время поиска страны по названию');
    }
  }

  public async findById(dto: number[]): Promise<CountryEntity[]> {
    try {
      return this.repository.findBy({
        id: In(dto),
      });
    } catch {
      throw new Error('Ошибка во время поиска страны по id');
    }
  }
}
