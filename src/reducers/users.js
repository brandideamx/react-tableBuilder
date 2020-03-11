const usersReducer = (state = {}, action) => {
    switch(action.type) {
      case 'AUTH_USER':
        return action.payload
      case 'LOGOUT_USER':
        return action.payload
      default:
        return state;
    }
  }
  
  export default usersReducer;