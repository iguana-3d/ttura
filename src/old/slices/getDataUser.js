import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messageSMS: '',
  isFetching: false,
  isSuccessSMS: false
}

export const sendUser2FA = createAsyncThunk('ttura/user2FA', async (action, payload) => {
  console.log("getstate", action, payload.getState());

  const bodyParameters = {
    "Email": `${payload.getState().signIn.emailUser}`,
    "Token": `${payload.getState().signIn.jwt}`
  };

  const promise = axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/RegistrarCodigo2FA', bodyParameters)
    .then(function (response) {
      return response.data.Message;
    })
    .catch(function (error) {
      console.log(error.data);
    });

  return await promise;
});

const user2FASlice = createSlice({
  name: 'user2FA',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(sendUser2FA.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccessSMS = true;
      state.isActive = action.payload.isActive;
      state.jwt = action.payload.Jwt;
      state.emailUser = action.payload.emailUser;
    });
  }
});


export const { user2FA } = user2FASlice.actions

export default user2FASlice.reducer;