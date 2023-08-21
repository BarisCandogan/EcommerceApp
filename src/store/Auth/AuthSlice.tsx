import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  token: string;
  user: string;
  signedIn: boolean;
}

const initialState: AuthState = {
  token: '',
  user: '',
  signedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.token = action.payload;
    },
    getUser: (state, action) => {
      state.user = action.payload;
    },
    isUserSignedIn: (state, action) => {
      state.signedIn = action.payload;
    },
    logOut: state => {
      state.signedIn = false;
      state.token = '';
    },
  },
});

export const {getToken, getUser, isUserSignedIn, logOut} = authSlice.actions;

export default authSlice.reducer;
