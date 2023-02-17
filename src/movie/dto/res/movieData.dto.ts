export default class CreateMovieDtoRes {
  public readonly kinopoiskId: number;

  public readonly nameRu: string;

  public readonly nameEn?: string;

  public readonly year?: number;

  public readonly posterUrl?: string;

  public readonly posterUrlPreview?: string;

  public readonly countries?: number[];

  public readonly genres?: number[];

  public readonly duration?: number;

  public readonly premiereRu?: string;
}
