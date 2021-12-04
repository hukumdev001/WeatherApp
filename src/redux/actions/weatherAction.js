import * as ActionTypes from './../../constants/actionTypes';

export const getWeather = data => {
  return {
    type: ActionTypes.Weather.WEATHER,
    payload: data,
  };
};
