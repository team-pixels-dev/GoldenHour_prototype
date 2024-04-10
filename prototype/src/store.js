
import { configureStore } from '@reduxjs/toolkit'
import colorSlice from './stores/color-slice'

export const store = configureStore({
    reducer: {
        color : colorSlice,
    },
});