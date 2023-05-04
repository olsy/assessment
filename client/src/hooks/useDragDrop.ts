import { useCallback } from 'react';
import { IDataWithCards, RowID } from '../types/cards';
import { reorderCards } from '../helpers';

interface Props {
  state?: IDataWithCards;
  setState: any;
}

export default ({ state, setState }: Props) => {
  const handleDragEnd = useCallback(
    (result: any) => {
      if (state) {
        const { source, destination, draggableId } = result;

        if (!destination) {
          return;
        }

        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        const start = state?.rows[source.droppableId as RowID];
        const finish = state?.rows[destination.droppableId as RowID];

        if (start === finish) {
          const cards = Array.from(start.cards);
          cards.splice(source.index, 1);
          cards.splice(destination.index, 0, draggableId);

          const newRow = {
            ...start,
            cards,
          };

          setState((s: IDataWithCards) =>
            reorderCards(
              {
                ...s,
                rows: {
                  ...s.rows,
                  [newRow.id]: newRow,
                },
              } as IDataWithCards,
              result,
            ),
          );
          return;
        }

        const startCardIds = Array.from(start.cards);
        startCardIds.splice(source.index, 1);
        const newStart = {
          ...start,
          cards: startCardIds,
        };

        const finishCardIds = Array.from(finish.cards);
        finishCardIds.splice(destination.index, 0, draggableId);
        const newFinish = {
          ...finish,
          cards: finishCardIds,
        };

        setState((s: IDataWithCards) =>
          reorderCards(
            {
              ...s,
              rows: {
                ...s.rows,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
              },
            } as IDataWithCards,
            result,
          ),
        );
      }
    },
    [state],
  );
  return {
    handleDragEnd,
  };
};
