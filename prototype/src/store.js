
import { configureStore } from '@reduxjs/toolkit'
import colorSlice from './stores/colorSlice'

export const store = configureStore({
    reducer: {
        color : colorSlice,
    },
});