export interface ICard {
  type: string;
  image: string;
  title: string;
  position: number;
}

export type RowID = 'row-1' | 'row-2';

export interface IRow {
  id: string;
  title: string;
}
export interface IRowWithCards extends IRow {
  cards: string[];
}

export interface IData {
  rows: Record<RowID, IRow>;
  rowOrder: RowID[];
}

export interface IDataWithCards extends Omit<IData, 'rows'> {
  rows: Record<RowID, IRowWithCards>;
  cards: Record<string, ICard>;
}
