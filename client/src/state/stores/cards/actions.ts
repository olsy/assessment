import * as actionTypes from './actionTypes';
import { ICard, IDataWithCards } from '../../../types/cards';

export const getCardsPending = () => ({
  type: actionTypes.GET_CARDS_PENDING,
});
export const getCardsSuccess = (data: ICard[]) => ({
  type: actionTypes.GET_CARDS_SUCCESS,
  data,
});
export const getCardsFailed = (error: unknown) => ({
  type: actionTypes.GET_CARDS_FAILED,
  error,
});

export const saveData = (data: IDataWithCards) => ({
  type: actionTypes.SAVE_DATA,
  data,
});
export const saveDataPending = () => ({
  type: actionTypes.SAVE_DATA_PENDING,
});
export const saveDataSuccess = ({
  data,
  lastTimeSaved,
}: {
  data: { position: number; type: string }[];
  lastTimeSaved: string;
}) => ({
  type: actionTypes.SAVE_DATA_SUCCESS,
  data,
  lastTimeSaved,
});
export const saveDataFailed = (error: unknown) => ({
  type: actionTypes.SAVE_DATA_FAILED,
  error,
});

export type CardActionType =
  | ReturnType<typeof getCardsPending>
  | ReturnType<typeof getCardsSuccess>
  | ReturnType<typeof getCardsFailed>
  | ReturnType<typeof saveDataPending>
  | ReturnType<typeof saveDataSuccess>
  | ReturnType<typeof saveDataFailed>;
