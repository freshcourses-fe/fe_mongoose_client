import ACTION_TYPES from './types';

class AuthActionCreators {
  static loginRequest (userData) {
    return {
      type: ACTION_TYPES.LOGIN_REQUEST,
      payload: userData,
    };
  }
  static signUpRequest (userData) {
    return {
      type: ACTION_TYPES.SIGN_UP_REQUEST,
      payload: userData,
    };
  }
  static refreshRequest (userData) {
    return {
      type: ACTION_TYPES.REFRESH_REQUEST,
      payload: userData,
    };
  }
  static authSuccess (userData) {
    return {
      type: ACTION_TYPES.AUTH_SUCCESS,
      payload: userData,
    };
  }
  static authError (error) {
    return {
      type: ACTION_TYPES.AUTH_ERROR,
      payload: error,
    };
  }
}

export default AuthActionCreators;
