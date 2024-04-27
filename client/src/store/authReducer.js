const authReducer = (state = { isAuthenticated: false, token: null, user: null }, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload.accessToken,
          user: action.payload.user,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          user: null,
        };
      default:
        return state;
    }
  };
  export default authReducer;