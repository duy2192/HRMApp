import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {authApi} from 'api';
import storageKeys from 'constants/storage-keys';


export const login = createAsyncThunk('user/login', async (payload) => {
    const data = await authApi.login(payload);
    localStorage.setItem(storageKeys.TOKEN, data.results.token);
    localStorage.setItem(storageKeys.USER, JSON.stringify(data.results));
    return data.results;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(storageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logOut(state) {
      localStorage.removeItem(storageKeys.USER);
      localStorage.removeItem(storageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});
const { actions, reducer } = userSlice;
export const { logOut } = actions;
export default reducer;
