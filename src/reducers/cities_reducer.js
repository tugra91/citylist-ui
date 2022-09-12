import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        citiesChanged(state, action) {
            while (state.length > 0) {
                state.pop();
            }
            state.push(...action.payload);
        }
    }
});

export const { citiesChanged } = citiesSlice.actions;

export default citiesSlice;