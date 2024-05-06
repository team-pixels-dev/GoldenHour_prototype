import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrival:0,
    departure:0,
};

const timeSlice = createSlice({
    name: 'time',
    initialState,
    reducers: {
        setArrival: (state, action) => {
            state.arrival = action.payload; 
        },
        setDeparture: (state, action) => {
            state.departure = action.payload;
        },
    },
});

export const {setArrival, setDeparture} = timeSlice.actions;
export default timeSlice.reducer;