import { configureStore } from "@reduxjs/toolkit";
import { produce } from "structurajs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { LOGIN, LOGOUT, SET_CURRENT_TOPIC_ID, SET_NAME,SET_CURRENT_TOPIC,SET_CURRENT_TOPIC_NAME } from "./actionTypes";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const initialState = {
  name: "John Doe",
  email: "johndoe@gmail.com",
  currentTopicId: "",
  currentTopicName: "",
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
        draft.email = action.payload.email;
        draft.name = action.payload.name;
        break;
      case SET_NAME:
        draft.name = action.payload.name;
        break;
      case LOGOUT:
        draft.name = "";
        draft.email = "";
        break;
      case SET_CURRENT_TOPIC_ID:
        draft.currentTopic = action.payload;
        break;
      case SET_CURRENT_TOPIC_NAME:
        draft.currentTopicName = action.payload;
        break;
      case SET_CURRENT_TOPIC:
        draft.currentTopicId = action.payload.id;
        draft.currentTopicName = action.payload.name;
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
