
import { configureStore } from '@reduxjs/toolkit';
import colorSlice from './stores/color-slice';
import testSlice from './stores/test-slice';

export const store = configureStore({
    reducer: {
        color : colorSlice,
        number : testSlice
    },
    
});