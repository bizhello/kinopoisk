import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import GenreEntity from '../entity/genres';

@Injectable()
export default class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly repository: Repository<GenreEntity>,
  ) {}

  public async createGenre(dto: string): Promise<GenreEntity> {
    return this.repository.save({
      title: dto,
    });
  }

  public async findAll(): Promise<GenreEntity[]> {
    return this.repository.find();
  }

  public async findByName(dto: string): Promise<GenreEntity> {
    return this.repository.findOneBy({
      title: dto,
    });
  }

  public async findById(dto: number[]): Promise<GenreEntity[]> {
    return this.repository.findBy({
      id: In(dto),
    });
  }
}
