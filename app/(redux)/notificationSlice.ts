import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expoPushToken: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setExpoPushToken: (state, action) => {
      state.expoPushToken = action.payload;
    },
  },
});

export const { setExpoPushToken } = notificationSlice.actions;
export default notificationSlice.reducer;
