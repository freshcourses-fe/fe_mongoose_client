import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

export const login = userData => httpClient.post(`users/auth/login`, userData);
export const refresh = refreshObj =>
  httpClient.post(`$users/auth/refresh`, refreshObj);
export const signup = userData =>
  httpClient.post(`$users/auth/register`, userData);
