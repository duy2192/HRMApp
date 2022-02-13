import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from 'api/authApi';
import storageKeys from 'constants/storage-keys';


export const login = createAsyncThunk('user/login', async (payload) => {
    const data = await userApi.login(payload);
    localStorage.setItem(storageKeys.TOKEN, data.results.token);
    localStorage.setItem(storageKeys.USER, JSON.stringify(data.results));
    return data;
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
