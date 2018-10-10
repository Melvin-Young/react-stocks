export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    const timeElapsed =
      (new Date().getTime() - JSON.parse(serializedState).timestamp) / 1000;
    if (serializedState === null || timeElapsed > 60) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error(error);
  }
};

export const saveState = state => {
  try {
    state.timestamp = new Date().getTime().toString();
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (error) {
    console.error(error);
  }
};
