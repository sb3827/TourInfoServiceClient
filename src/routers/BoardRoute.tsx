import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import {NotFound} from '../pages'

type BoardRouteProps = {}

export const BoardRoute: FC<BoardRouteProps> = ({}) => {
    return (
        <Routes>
            <Route path="/place"></Route>
            <Route path="/course"></Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
