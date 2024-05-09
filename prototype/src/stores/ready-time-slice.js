import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalReadyCompletedTime: 0, // 준비를 완료할 시점 (ms)
  totalReadyTime : 0, // 모든 준비에 걸리리는 시간 (minute)
  washingCompletedTime: 0, // 씻기를 완료할 시점 (ms)
  washingTime : 0, // 씻는데 걸리는 시간 (minute)
  etcCompletedTime: 0, // 옷입고 준비하기를 완료할 시점 (ms)
  etcTime : 0, // 옷입고 준비하는데 걸리는 시간 (minute)
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
    },
    setTotalReadyTime : (state, action) => {
      state.totalReadyTime = action.payload;
    },
    setWashingCompletedTime : (state, action) => {
      state.washingCompletedTime = action.payload; 
    },
    setWashingTime : (state, action) => {
      state.washingTime = action.payload; 
    },
    setEtcCompletedTime : (state, action) => {
      state.etcCompletedTime = action.payload; 
    },
    setEtcTime : (state, action) => {
      state.etcTime = action.payload; 
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
export const { setTotalReadyCompletedTime, setTotalReadyTime, setWashingCompletedTime, setWashingTime,
   setEtcCompletedTime, setEtcTime, setSpareTime, setSavedWashingTime, setSavedEtcTime } = readyTimeSlice.actions;

export default readyTimeSlice.reducer;
