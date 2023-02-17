import SortEnum from '../../../enum/sort.enum';

export default class SortDto {
  public readonly sort?:
    | SortEnum.upA
    | SortEnum.downA
    | SortEnum.upD
    | SortEnum.downD;
}
