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
    setToken: (state, action: PayloadAction<{ token: string }>) => {
        state.token = action.payload.token;
    }
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
