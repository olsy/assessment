import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionType from '../stores/cards/actionTypes';
import * as actions from '../stores/cards/actions';
import * as api from '../../services/api/cards';
import { ICard } from '../../types/cards';
import { cardsSelector } from '../selectors/cards';
export function* getCardsPending() {
  try {
    const result: ICard[] = yield call(api.getCards);

    yield put(actions.getCardsSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(actions.getCardsFailed(error));
  }
}

export function* saveData({ data }: ReturnType<typeof actions.saveData>) {
  try {
    const prevCardsArr: ICard[] = yield select(cardsSelector);

    const prevCardsState = prevCardsArr.map(c => c.type).join('$$');

    const currCardsState = [
      ...data.rows['row-1'].cards,
      ...data.rows['row-2'].cards,
    ];

    if (prevCardsState === currCardsState.join('$$')) {
      return;
    }

    yield put(actions.saveDataPending());

    const payload = currCardsState.map((type, position) => ({
      type,
      position,
    }));

    // TODO: show loader during saving process
    // TODO: show last time saved
    // TODO: check all app in docker

    // @ts-ignore
    const res = yield call(api.updateCardsOrder, payload);

    console.log(res);

    yield put(
      actions.saveDataSuccess({
        data: payload,
        lastTimeSaved: new Date(res.lastTimeSaved).toISOString(),
      }),
    );
  } catch (error) {
    console.error(error);
    yield put(actions.saveDataFailed(error));
  }
}

export function* initSaga() {
  yield takeLatest(actionType.GET_CARDS_PENDING, getCardsPending);
  yield takeLatest(actionType.SAVE_DATA, saveData);
}

export default function runSagas(sagaMiddleware: any) {
  sagaMiddleware.run(initSaga);
}
