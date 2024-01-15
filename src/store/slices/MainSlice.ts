import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CommonState {
    searchValue: String | null
}

const initialState: CommonState = {
    searchValue: null
}

export const MainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        setSearchValueFromMain(state, action: PayloadAction<String>) {
            state.searchValue = action.payload
        }
    }
})

export const {setSearchValueFromMain} = MainSlice.actions

export default MainSlice
