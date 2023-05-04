import { createSelector } from 'reselect';
import { RootState } from '../index';
import { CardsState } from '../stores/cards/reducer';
import { IData, IDataWithCards, IRow, IRowWithCards } from '../../types/cards';

export const baseCardsSelector = (state: RootState): CardsState => state.cards;

export const cardsSelector = createSelector(
  [baseCardsSelector],
  state => state.data,
);

export const cardsLoadingSelector = createSelector(
  [baseCardsSelector],
  state => state.loading,
);

export const saveLoadingSelector = createSelector(
  [baseCardsSelector],
  state => state.saveLoading,
);

export const lastTimeSavedSelector = createSelector(
  [baseCardsSelector],
  state => state.lastTimeSaved,
);

export const stateSelector = createSelector([cardsSelector], cards => {
  const state: IData = {
    rows: {
      'row-1': {
        id: 'row-1',
        title: 'One',
      },
      'row-2': {
        id: 'row-2',
        title: 'Two',
      },
    },
    rowOrder: ['row-1', 'row-2'],
  };

  const cardsHash = cards.reduce(
    (acc, card) => ({ ...acc, [card.type]: card }),
    {},
  );

  const cardIds = cards.sort(c => c.position).map(c => c.type);
  const cardsForFirstRow = cardIds.splice(0, 3);

  const cardsInRow: Record<string, string[]> = {
    'row-1': cardsForFirstRow,
    'row-2': cardIds,
  };

  return {
    ...state,
    rows: {
      ...Object.entries(state.rows).reduce(
        (acc: any, [id, row]: [string, IRow]) => ({
          ...acc,
          [id]: { ...row, cards: cardsInRow[id] } as IRowWithCards,
        }),
        {},
      ),
    },
    cards: cardsHash,
  } as IDataWithCards;
});
