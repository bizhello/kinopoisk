import { IsNumberString } from 'class-validator';

import ICountries from '../../../interfaces/countries.interface';
import IGenres from '../../../interfaces/genres.interface';

export default class CreateMovieDtoReq {
  public readonly nameRu: string;

  public readonly nameEn?: string;

  @IsNumberString()
  public readonly year?: number;

  public readonly posterUrl?: string;

  public readonly posterUrlPreview?: string;

  public readonly countries?: ICountries[];

  public readonly genres?: IGenres[];

  @IsNumberString()
  public readonly duration?: number;

  public readonly premiereRu?: string;
}
