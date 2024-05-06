import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalReadyCompletedTime: 0,
  washingCompletedTime: 0,
  etcCompletedTime: 0,
  spareTime: 0
};

export const readyTimeSlice = createSlice({
  name: "readyTime",
  initialState,
  reducers: {
    setTotalReadyCompletedTime : (state, action) => {
        state.totalReadyCompletedTime = action.payload;
        console.log(action.payload);
    },
    setWashingCompletedTime : (state, action) => {
      state.washingCompletedTime = action.payload; 
    },
    setEtcCompletedTime : (state, action) => {
      state.etcCompletedTime = action.payload; 
    },
    setSpareTime : (state, action) => {
      state.spareTime = action.payload; 
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalReadyCompletedTime, setWashingCompletedTime, setEtcCompletedTime, setSpareTime } = readyTimeSlice.actions;

export default readyTimeSlice.reducer;
