import SortEnum from '../../../enum/sort.enum';

export default class PaginationOptions {
  public readonly take?: number;

  public readonly skip?: number;

  public readonly keyword?: string;

  public readonly sort?:
    | SortEnum.upA
    | SortEnum.downA
    | SortEnum.upD
    | SortEnum.downD;

  public readonly countries?: string;

  public readonly genres?: string;
}
