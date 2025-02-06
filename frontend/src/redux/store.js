import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mentorReducer from "./mentorSlice";
import { userReducer } from "./reducers";
import imageReducer from "./imageSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for persisted storage
  storage,     // Storage type (localStorage in this case)
  whitelist: ["user", "mentors" , "images"], // Reducers to persist
};

// Combine all reducers, including imageReducer
const rootReducer = combineReducers({
  user: userReducer,
  mentors: mentorReducer,
  images: imageReducer, // Add the image reducer here
});

// Apply persistence to the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store using Redux Toolkit
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };
