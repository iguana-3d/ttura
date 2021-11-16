import { createSlice, createAsyncThunk, PayloadAction  } from '@reduxjs/toolkit'
import type { RootState } from '../store/store';
import axios from 'axios';

interface tokenUser {
  id: number;
  jwt: string;
  tokenIsSuccessful: boolean;
  emailUser: string
}

interface loginUser {
  userName: string;
  password: string;
}

const initialState: tokenUser = {
  id: 0,
  jwt: '',
  tokenIsSuccessful: false,
  emailUser: ''
}

export const fetchLoginUser = createAsyncThunk('ttura/auth', async (action: loginUser, payload) => {
  
  const bodyParameters = {
    "Email": `${action.userName}`,
    "Password": `${action.password}`
  };

  const promise = axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/Autenticar', bodyParameters)
    .then(function (response) {
      response.data = {...response.data, emailUser: action.userName}
      return response.data;
    })
    .catch(function (error) {
      console.log(error.data);
    });

  return await promise;

});

const sendLoginSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.id = action.payload.Id;
      state.jwt = action.payload.Jwt;
      state.tokenIsSuccessful = action.payload.IsSuccessful;
      state.emailUser = action.payload.emailUser;
    });
  }
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const sendLogin = (state: RootState) => state.signIn

export default sendLoginSlice.reducer
