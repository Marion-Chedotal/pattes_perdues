export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const UPDATEUSER = 'UPDATE_USER';

export const loginSuccess = ( accessToken, user  ) => ({
  type: LOGIN_SUCCESS,
  payload: { accessToken, user },
});

export const logout = () => ({
  type: LOGOUT,
});

export const updateUser = (login) => ({
  type: UPDATEUSER,
  payload: { login },
});