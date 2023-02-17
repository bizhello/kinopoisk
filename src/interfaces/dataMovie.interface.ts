import ICountries from './countries.interface';
import IGenres from './genres.interface';

export default interface IDataMovie {
  readonly id: number;
  readonly kinopoiskId?: number;
  readonly nameRu?: string | null;
  readonly nameEn?: string | null;
  readonly year?: number;
  readonly posterUrl?: string;
  readonly posterUrlPreview?: string;
  readonly countries?: ICountries[];
  readonly genres?: IGenres[];
  readonly duration?: number;
  readonly premiereRu?: string;
}
