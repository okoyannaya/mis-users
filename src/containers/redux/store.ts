import { configureStore } from '@reduxjs/toolkit';

import usersReduser from './users-slice'

export const store = configureStore({
  reducer: {
    users: usersReduser,
   
  }
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;