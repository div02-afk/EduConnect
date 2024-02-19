import { configureStore } from "@reduxjs/toolkit";
import { produce } from "structurajs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { LOGIN, LOGOUT, SET_CURRENT_TOPIC } from "./actionTypes";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const initialState = {
  name: "",
  email: "",
  currentTopic: "",
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
        draft.name = action.payload.name;
        draft.email = action.payload.email;
        break;
      case LOGOUT:
        draft.name = "";
        draft.email = "";
        break;
      case SET_CURRENT_TOPIC:
        draft.currentTopic = action.payload;
        break;
    }
  });
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;
