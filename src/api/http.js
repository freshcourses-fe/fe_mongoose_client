import axios from 'axios';
import CONSTANTS from '../constants';

const httpClient = axios.create({
  baseURL: CONSTANTS.HTTP_SERVER_URL,
});

let accessTokenFromMemory = null;

function setTokens ({ accessToken, refreshToken }) {
  accessTokenFromMemory = accessToken;
  localStorage.setItem(CONSTANTS.REFRESH_TOKEN, refreshToken);
}

httpClient.interceptors.request.use(
  function (config) {
    // место где мы впаиваем accessToken
    if (accessTokenFromMemory) {
      config.headers['Authorization'] = `Bearer ${accessTokenFromMemory}`;
    }

    return config;
  },
  function (error) {
    // ошибка перед запросом
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    // запускаестся когда мы получаем положительный ответ с сервера
    if (response?.data?.data?.tokenPair) {
      setTokens(response.data.data.tokenPair);
    }
    return response;
  },
  async function (error) {
    // запускается когда респонс с сервера приходит со статусом 300+ (ошибки)
    const refreshTokenFromLS = localStorage.getItem(CONSTANTS.REFRESH_TOKEN);

    const {
      response: { status },
    } = error;

    // делаем запрос рефреш если прогорел токен и у нас есть рефреш в локал сторадже
    if (status === 419 && refreshTokenFromLS) {
      const {
        data: {
          data: {
            tokenPair
          },
        },
      } = await axios.post(`${CONSTANTS.HTTP_SERVER_URL}/users/auth/refresh`, {
        refreshToken: refreshTokenFromLS,
      });

      setTokens(tokenPair)
      error.config.headers['Authorization'] = `Bearer ${accessTokenFromMemory}`;

      return httpClient.request(error.config); // повторяем изначальный запрос
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
