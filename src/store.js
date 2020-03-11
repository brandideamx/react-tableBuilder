import { createStore } from 'redux';
import reducer from './reducers';
import { 
  getUserLocalStorageState, 
  setUserLocalStorageState, 
  getEntriesLocalStorageState, 
  setEntriesLocalStorageState }  from './utils/localStorage';

const initialState = {
  "user": getUserLocalStorageState(),
  "entries": getEntriesLocalStorageState(),
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
);

store.subscribe(() => {
  setUserLocalStorageState(store.getState().user);
  setEntriesLocalStorageState(store.getState().entries);
})

export default store;