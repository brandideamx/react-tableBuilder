export const authUser = payload => ({
  type: 'AUTH_USER',
  payload
});

export const logoutUser = payload => ({
  type: 'LOGOUT_USER',
  payload
});

export const getAllEntries = payload => ({
  type: 'GET_ALL',
  payload
});

export const clearEntries = payload => ({
  type: 'CLEAR_ENTRIES',
  payload
});
