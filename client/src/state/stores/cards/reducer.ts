import * as actionTypes from './actionTypes';
import { ICard } from '../../../types/cards';
import { CardActionType } from './actions';

export interface CardsState {
  data: ICard[];
  loading: boolean;
  saveLoading: boolean;
  lastTimeSaved?: string;
}

const initialState: CardsState = {
  data: [],
  loading: false,
  saveLoading: false,
  lastTimeSaved: undefined,
};

export default (state = initialState, action: CardActionType) => {
  switch (action.type) {
    case actionTypes.GET_CARDS_PENDING: {
      return { ...state, loading: true, data: [] };
    }

    case actionTypes.GET_CARDS_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    }

    case actionTypes.GET_CARDS_FAILED: {
      return { ...state, loading: false, error: action.error };
    }

    case actionTypes.SAVE_DATA_PENDING: {
      return { ...state, saveLoading: true };
    }

    case actionTypes.SAVE_DATA_SUCCESS: {
      const cardsHash: Record<string, number> = action.data.reduce(
        (acc, el) => ({ ...acc, [el.type]: el.position }),
        {},
      );

      return {
        ...state,
        saveLoading: false,
        data: [
          ...state.data
            .map(c => ({ ...c, position: cardsHash[c.type] }))
            .sort((a, b) => a.position - b.position),
        ],
        lastTimeSaved: action.lastTimeSaved,
      };
    }

    case actionTypes.SAVE_DATA_FAILED: {
      return { ...state, saveLoading: false, error: action.error };
    }

    default:
      return state;
  }
};
