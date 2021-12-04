import {all} from 'redux-saga/effects';
import {weatherWatcher} from './weatherSaga';

export default function* rootSaga() {
  yield all([weatherWatcher()]);
}
