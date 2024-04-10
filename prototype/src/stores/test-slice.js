import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const plus = (value) => {
  return value + 1
};

export const testSlice = createSlice({
  name: "number",
  initialState,
  reducers: {
    plusNumber : (state) => {
        state.value = plus(state.value);
    },
  },
});

// Action creators are generated for each case reducer function
export const { plusNumber } = testSlice.actions;

export default testSlice.reducer;
