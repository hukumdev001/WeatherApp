import {takeEvery, put, call} from 'redux-saga/effects';
import * as ActionTypes from '../../constants/actionTypes';
import {API} from '../../config/axios';
import {weatherKey} from '../../constants/key';

export function* getWeater(action) {
  try {
    const response = yield call(() =>
      API.get(
        `weather?q=${action.payload.city},${action.payload.zipcode},${action.payload.country}&appid=${weatherKey}`,
        action.payload.data,
      ),
    );

    yield put({
      type: ActionTypes.Weather.SAVEWEATHER,
      payload: {data: response.data},
    });

    // yield put({type: ActionTypes.Common.IS_LOADING, payload: {data: false}});
  } catch (error) {}
}

export function* weatherWatcher() {
  yield takeEvery(ActionTypes.Weather.WEATHER, getWeater);
}
