import runCardsSagas from './cards';

export default function runSagas(sagaMiddleware: any) {
  runCardsSagas(sagaMiddleware);
}
