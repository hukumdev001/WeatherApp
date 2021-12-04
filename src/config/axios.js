import axios from 'axios';
import {weatherApi} from '../constants/urls';
import AsyncStorage from '@react-native-community/async-storage';

const API = axios.create({
  baseURL: weatherApi,
  headers: {
    'Content-Type': 'application/json',
  },
});
// request header
API.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

API.interceptors.response.use(
  response => {
    return response;
  },
  err =>
    new Promise(async (resolve, reject) => {
      if (
        err.response &&
        err.response.status === 401 &&
        err.config &&
        !err.config._retry
      ) {
      }
      reject(err);
    }),
);

export {API};
