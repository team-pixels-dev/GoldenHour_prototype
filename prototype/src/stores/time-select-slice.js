import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrival:0, // 도착 시점 (ms)
    departure:0, // 출발 시점 (ms)
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