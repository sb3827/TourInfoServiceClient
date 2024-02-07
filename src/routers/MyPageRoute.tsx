import {Route, Routes} from 'react-router-dom'
import {MyModifyPage, MyPage, NotFound, EditPassword} from '../pages'

export const MyPageRoute = () => {
    return (
        <Routes>
            <Route path=":mno" element={<MyPage />} />
            <Route path="/modify">
                <Route index element={<MyModifyPage />} />
                <Route path="password" element={<EditPassword />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
