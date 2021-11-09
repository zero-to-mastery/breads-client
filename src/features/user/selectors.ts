export const getUserById = (state: any, id: number | string) => {
  return state.user[id];
};
