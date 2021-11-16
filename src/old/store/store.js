import { configureStore } from '@reduxjs/toolkit';
import sendLogin from '../slices/sendLogin';
import user2FA from '../slices/getDataUser';
import sendSms  from '../slices/validade2FA';

export const store = configureStore({
  reducer: {
    signIn: sendLogin,
    user2FA: user2FA,
    sendSms: sendSms
  },
})