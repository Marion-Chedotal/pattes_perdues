export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = ( accessToken, user  ) => ({
  type: LOGIN_SUCCESS,
  payload: { accessToken, user },
});

export const logout = () => ({
  type: LOGOUT,
});