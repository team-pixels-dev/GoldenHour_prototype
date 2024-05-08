import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalReadyCompletedTime: 0, // 준비를 완료할 시점(ms)
  washingCompletedTime: 0, // 씻기를 완료할 시점(ms)
  etcCompletedTime: 0, // 옷입고 준비하기를 완료할 시점(ms)
  spareTime: 0, // 여유시간 (minute)
  savedWasingTime: 0, // 씻기 아낀 시간 (minute)
  savedEtcTime: 0 // 옷입고 준비하기 아낀 시간 (minute)
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
    setSavedWashingTime : (state, action) => {
      state.savedWasingTime = action.payload;
    },
    setSavedEtcTime : (state, action) => {
      state.savedEtcTime = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTotalReadyCompletedTime, setWashingCompletedTime, setEtcCompletedTime, setSpareTime, setSavedWashingTime, setSavedEtcTime } = readyTimeSlice.actions;

export default readyTimeSlice.reducer;
