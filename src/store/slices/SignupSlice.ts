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
        },
        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload
        },
        setBirth(state, action: PayloadAction<string>) {
            state.birth = action.payload
        },
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload
        },
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setRole(state, action: PayloadAction<string>) {
            state.role = action.payload
        }
    }
})

export const {setEmail, setPassword, setBirth, setPhone, setName, setRole} =
    SignupSlice.actions

export default SignupSlice
