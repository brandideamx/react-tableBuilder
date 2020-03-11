const entriesReducer = (state = {}, action) => {
  switch(action.type) {
    case 'GET_ALL':
      return action.payload
    case 'CLEAR_ENTRIES':
      return action.payload
    default:
      return state;
  }
}

export default entriesReducer;