import {combineReducers} from 'redux'
import ReportSlice from './slices/ReportSlice'

//리듀서 등록
export const rootReducer = combineReducers({
    report: ReportSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
