import { configureStore } from '@reduxjs/toolkit';
import savedSlice from './saved';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
    reducer: {saved:savedSlice},
  })
  console.log('Initial state:', store.getState());
  export type RootState = ReturnType<typeof store.getState>;
  export const useAppDispatch: () => typeof store.dispatch = useDispatch;
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;