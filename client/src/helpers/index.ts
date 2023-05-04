import { IDataWithCards, RowID } from '../types/cards';

/** Extra operation to split cards between rows that first row always has 3 cards and second one - 2 cards */
export const reorderCards = (data: IDataWithCards, metadata: any) => {
  const { source, destination } = metadata;

  const destinationCards = data.rows[destination.droppableId as RowID].cards;
  const sourceCards = data.rows[source.droppableId as RowID].cards;

  let item;
  if (destination.droppableId === 'row-1' && destinationCards.length > 3) {
    item = destinationCards.pop() as string;
    sourceCards.unshift(item);
  } else if (
    destination.droppableId === 'row-2' &&
    destinationCards.length > 2
  ) {
    item = destinationCards.shift() as string;
    sourceCards.push(item);
  }

  return data;
};
