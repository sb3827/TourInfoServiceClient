import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {MyModifyPage, MyPage, NotFound} from '../pages'

type MyPageRouteProps = {}

export const MyPageRoute: FC<MyPageRouteProps> = ({}) => {
    return (
        <Routes>
            <Route path="/" element={<MyPage />} />
            <Route path="/modify" element={<MyModifyPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
