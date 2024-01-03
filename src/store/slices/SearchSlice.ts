import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface CommonState {
    reportSearch: Boolean
}

const initialState: CommonState = {
    reportSearch: false
}

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setReportSearch(state, action: PayloadAction<Boolean>) {
            state.reportSearch = action.payload
        }
    }
})

export const {setReportSearch} = SearchSlice.actions

export default SearchSlice
