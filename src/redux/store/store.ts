import { configureStore } from '@reduxjs/toolkit';
import signIn from '../slices/sendLogin';
import registryF2A from '../slices/registryF2A';

export const store = configureStore({
  reducer: {
    signIn: signIn,
    registryF2A: registryF2A
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch