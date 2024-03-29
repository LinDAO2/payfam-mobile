import {configureStore} from '@reduxjs/toolkit';
import {collectionName, collectionReducer} from './collection-slice';
import {globalName, globalReducer} from './global-slice';
import {sessionName, sessionReducer} from './session-slice';

export const store = configureStore({
  reducer: {
    [sessionName]: sessionReducer,
    [collectionName]: collectionReducer,
    [globalName]: globalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
