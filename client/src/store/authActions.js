export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATE_USER = 'UPDATE_USER';
export const EXPIRED_TOKEN = 'EXPIRED_TOKEN';

export const loginSuccess = ( accessToken, user  ) => ({
  type: LOGIN_SUCCESS,
  payload: { accessToken, user },
});

export const logout = () => ({
  type: LOGOUT,
});

export const expiredToken = (accessToken, user) => ({
  type: EXPIRED_TOKEN,
  payload: { accessToken, user },
});