import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  emailUser: '',
  jwt: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  ErrorMessage: "",
  isActive: 0
}

export const fetchLoginUser = createAsyncThunk('ttura/auth', async (action, payload) => {
  const bodyParameters = {
    "Email": `${action.email}`,
    "Password": `${action.password}`
  };

  const promise = axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/Autenticar', bodyParameters)
    .then(function (response) {

      const bodyParameters2 = {
        "Email": `${action.email}`,
        "Token": `${response.data.Jwt}`
      };

      const promisse2 = axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/ObterUsuario', bodyParameters2)
        .then(function (response2) {
          const data = {...response2.data, Jwt: response.data.Jwt, emailUser: action.email};
          return data;
        })
        .catch(function (error2) {
          console.log(error2.data);
        });

      return promisse2;

    })
    .catch(function (error) {
      console.log(error.data)
    });

  return await promise;

});

const sendLogin = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.isActive = action.payload.isActive;
      state.jwt = action.payload.Jwt;
      state.emailUser = action.payload.emailUser;
    });
    // builder.addCase(fetchLoginUser.pending, (state, action) => {
    //   console.log("state, action", state, action.payload)
    // });
    // builder.addCase(fetchLoginUser.rejected, (state, action) => {
    //   console.log("state, action", state, action.payload)
    // })
  }
});

export const { signIn } = sendLogin.actions

export default sendLogin.reducer;