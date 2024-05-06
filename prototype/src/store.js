
import { configureStore } from '@reduxjs/toolkit';
import colorSlice from './stores/color-slice';
import testSlice from './stores/test-slice';
import timeReducer from './stores/time-select-slice';
import readyTimeSlice from './stores/ready-time-slice';

export const store = configureStore({
    reducer: {
        color : colorSlice,
        number : testSlice,
        time: timeReducer,
        readyTime : readyTimeSlice,
    },
    
});