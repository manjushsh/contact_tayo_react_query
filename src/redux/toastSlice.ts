import { createSlice } from '@reduxjs/toolkit'

export interface ToastState {
    showToast: {
        status: boolean
        type: 'primary' | 'secondary' | 'success' | 'danger' |'warning' | 'info' | 'light' | 'dark'
        body: string
    }
}

const initialState: ToastState = {
    showToast: {
        status: false,
        type: "primary",
        body: ""
    }
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setShowToast(state, action) {
            state.showToast = action.payload
            return state
        }
    },
})

// Action creators are generated for each case reducer function
export const { setShowToast } = toastSlice.actions

export default toastSlice.reducer