// swarmSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  token: string | null;
}

const initialState: TokenState = {
  token: null
};

const tokenSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = null;
    }
  },
});

export const { setToken, deleteToken } = tokenSlice.actions;
export default tokenSlice.reducer;
export type { TokenState };