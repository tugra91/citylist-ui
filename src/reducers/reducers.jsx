import { combineReducers } from "redux";
import citiesSlice from "./cities_reducer";
import loginSlice from "./login_reducer";


const staticReducers = {
    cities: citiesSlice.reducer,
    loginProcess: loginSlice.reducer
};

export function createReducers() {
    return combineReducers({ ...staticReducers });
}