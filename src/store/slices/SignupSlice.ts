import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CommonState {
    email: String | null
    password: String | null
    birth: String | null
    phone: String | null
    name: String | null
    role: String | null
}

const initialState: CommonState = {
    email: null,
    password: null,
    birth: null,
    phone: null,
    name: null,
    role: null
}

export const SignupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        }
    }
})

export const {setEmail} = SignupSlice.actions

export default SignupSlice
