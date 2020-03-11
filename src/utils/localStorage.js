export const getUserLocalStorageState = () => {
  const userStorage = localStorage.getItem("user");
  if(userStorage === null) return undefined;
  return JSON.parse(userStorage);
};

export const setUserLocalStorageState = state => {
  localStorage.setItem("user", JSON.stringify(state));
}

export const getEntriesLocalStorageState = () => {
  const entriesStorage = localStorage.getItem("entries");
  if(entriesStorage === null) return undefined;
  return JSON.parse(entriesStorage);
};

export const setEntriesLocalStorageState = state => {
  localStorage.setItem("entries", JSON.stringify(state));
}