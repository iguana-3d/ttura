import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  mesageSms: '',
  validateSmsMessage: false
}

export const sendSmsCode = createAsyncThunk('ttura/validadeSmsCode', async (action, payload) => {
  console.log(action, payload)
  const bodyParameters = {
    "Email": `${payload.getState().signIn.emailUser}`,
    "Sms": `${action}`
  }

  const promise = axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/ValidarCodigo2FA', bodyParameters)
    .then(function (response) {
      console.log("sms", response.data);
      return response.data
    })
    .catch(function (error) {
      console.log(error.data);
    });

  return await promise;
})

const sendSmsSlice = createSlice({
  name: 'sendSms',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(sendSmsCode.fulfilled, (state, action) => {
      state.mesageSms = action.payload.IsSuccessful;
      state.validateSmsMessage = action.payload.Message;
    });
  }
});

export const { sendSms } = sendSmsSlice.actions

export default sendSmsSlice.reducer;