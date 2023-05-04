import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  Middleware,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import runSagas from './sagas/runSagas';

import dialogs from './stores/dialogs';
import cards from './stores/cards/reducer';

const rootReducer = combineReducers({
  dialogs,
  cards,
});

export type RootState = ReturnType<typeof rootReducer>;

const composeEnhancers =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares: Middleware[] = [sagaMiddleware];

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares)),
);

runSagas(sagaMiddleware);

export default store;
