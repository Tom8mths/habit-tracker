import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "@/redux/features/auth-slice";
import categoryReducer from "@/redux/features/category-slices"
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const persistConfig = {
  key: 'habt',
  storage,
};

export const store = configureStore({
  reducer: {
    authReducer,
    categoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;