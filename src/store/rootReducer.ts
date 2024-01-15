import {combineReducers} from 'redux'
import ReportSlice from './slices/ReportSlice'
import LoginSlice from './slices/LoginSlice'
import SearchSlice from './slices/SearchSlice'
import ManagerSlice from './slices/ManagerSlice'
import MainSlice from './slices/MainSlice'
import CourseSlice from './slices/CourseSlice'

//리듀서 등록
export const rootReducer = combineReducers({
    report: ReportSlice.reducer,
    login: LoginSlice.reducer,
    search: SearchSlice.reducer,
    manager: ManagerSlice.reducer,
    main: MainSlice.reducer,
    course: CourseSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>
