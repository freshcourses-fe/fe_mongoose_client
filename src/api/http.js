import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

let accessTokenFromMemory = null;

httpClient.interceptors.request.use(
  function (config) {
    // место где мы впаиваем accessToken
    if (accessTokenFromMemory) {
      config.headers['Authorization'] = `Bearer ${accessTokenFromMemory}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response?.data?.data?.tokenPair) {
      const { accessToken, refreshToken } = response.data.data.tokenPair;

      accessTokenFromMemory = accessToken;
      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);
    }
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    const {
      response: { status },
    } = error;

    if (status === 419 && refreshTokenFromLS) {
      const {
        data: {
          data: {
            tokenPair: { accessToken, refreshToken },
          },
        },
      } = await axios.post(`${CONSTANTS.HTTP_SERVER_URL}/users/auth/refresh`, {
        refreshToken: refreshTokenFromLS,
      });

      accessTokenFromMemory = accessToken;
      localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);

      error.config.headers['Authorization'] = `Bearer ${accessTokenFromMemory}`;

    
      return httpClient.request(error.config)
    }
    return Promise.reject(error);
  }
);

export const login = userData => httpClient.post(`users/auth/login`, userData);
export const refresh = refreshToken =>
  httpClient.post(`users/auth/refresh`, { refreshToken });
export const signup = userData =>
  httpClient.post(`users/auth/register`, userData);

export const test = () => httpClient.get('test');
