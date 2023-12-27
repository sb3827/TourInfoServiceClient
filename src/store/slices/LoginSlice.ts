import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {LoginUserData} from '../../data/User/User'

//Slice를 만들어서 상태값 저장하고싶은 거 추가하면 됨
//useSelect를 이용해서 상태 값에 접근할 수 있고
//dispatch를 이용해서 reducers에 접근하여 값 변경 할 수 있음

interface CommonState {
    user: String | null
    role: String | null
}

const initialState: CommonState = {
    user: null,
    role: null
}

export const ReportSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<LoginUserData>) {
            state.user = action.payload.user
            state.role = action.payload.role
        }
    }
})

export const {setUsers} = ReportSlice.actions
