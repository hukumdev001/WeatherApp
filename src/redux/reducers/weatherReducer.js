import * as ActionTypes from '../../constants/actionTypes';

const initialState = {
  weatherData: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.Weather.SAVEWEATHER: {
      return {
        ...state,
        weatherData: action.payload,
      };
    }

    default:
      return state;
  }
};
