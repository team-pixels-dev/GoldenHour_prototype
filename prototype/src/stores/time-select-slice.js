import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arrival:'',
    departure: '',
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