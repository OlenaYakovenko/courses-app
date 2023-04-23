export const selectUserState = (state) => state.user;
export const selectUser = (state) => state.user.user;
export const selectIsAdmin = (state) => state.user.user.role === 'admin';
