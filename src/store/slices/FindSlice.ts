import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CommonState {
    name: String | null
    phone: String | null
    email: String | null
}

const initialState: CommonState = {
    name: null,
    phone: null,
    email: null
}

export const FindSlice = createSlice({
    name: 'Find',
    initialState,
    reducers: {
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload
        },
        setEmail(state, action: PayloadAction<string>) {
            state.email = action.payload
        }
    }
})

export const {setName, setPhone, setEmail} = FindSlice.actions

export default FindSlice
