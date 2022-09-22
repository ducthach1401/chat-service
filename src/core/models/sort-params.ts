import { SortDir } from '../enums/sort-dir';

export class SortParams {
  sort: string;
  dir: SortDir;

  constructor(sort = 'id', dir: SortDir = SortDir.Asc) {
    this.sort = sort;
    this.dir = dir;
  }
}
