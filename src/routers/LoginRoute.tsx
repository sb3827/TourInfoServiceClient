import {Navigate} from 'react-router-dom'
import {Login} from '../pages'
import {getCookie} from '../util/cookie'

export const LoginRoute = () => {
    const refreshToken = getCookie('refreshToken')
    return refreshToken ? <Navigate to={'/'} /> : <Login />
}
