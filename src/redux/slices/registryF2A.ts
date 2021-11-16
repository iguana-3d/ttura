import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store/store';
import axios from 'axios';

interface registryF2A {
    isSucessful: boolean;
    message: string
}

const initialState: registryF2A = {
    isSucessful: false,
    message: ''
}

export const sendRegistryF2A = createAsyncThunk('ttura/registryF2A', async (action, payload) => {

    const state = payload.getState() as RootState;
    const { jwt, emailUser } = state.signIn;

    const bodyParameters = {
        "Email": `${emailUser}`,
        "Token": `${jwt}`
    };

    const promise = axios.post('https://dev-api.ttura.com/v1.0/TturaAuth/RegistrarCodigo2FA', bodyParameters)
        .then(function (response) {
            console.log(response.data);
            console.log(response.data)
            return response.data;            
        })
        .catch(function (error) {
            console.log(error.data);
        });

    return await promise;

});

const registryF2ASlice = createSlice({
    name: 'registryF2A',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(sendRegistryF2A.fulfilled, (state, action) => {
            state.isSucessful = action.payload.isSuccessful;
            state.message = action.payload.Message;
        });
    }
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export const registryF2A = (state: RootState) => state.signIn

export default registryF2ASlice.reducer
