import { configureStore } from "@reduxjs/toolkit";
import { createReducers } from "./reducers/reducers";

const store = configureStore({
    reducer: createReducers()
});

export default store;