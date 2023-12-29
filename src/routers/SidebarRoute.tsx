import {FC, useState} from 'react'
import {SidebarItem} from '../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket,
    faRightToBracket,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {logoutRequest} from '../api/Login/Login'
import {useDispatch} from 'react-redux'
import {setUsers} from '../store/slices/LoginSlice'
import LoadingSppinner from '../components/LoadingSpinner'
import {getWithTokenExpire} from '../util/localStorage'

type SidebarRouteProps = {
    isOpen: boolean
}

export const SidebarRoute: FC<SidebarRouteProps> = ({isOpen}) => {
    const [loading, setLoading] = useState(false)

    const user = getWithTokenExpire('token')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //로그인
    function onLogIn() {
        navigate('/login')
    }

    //로그아웃
    async function onLogout() {
        setLoading(true)
        try {
            const data = await logoutRequest()
            setLoading(false)
        } catch (e) {
            setLoading(false)
            return e
        }
        localStorage.removeItem('token')
        Cookies.remove('refreshToken')
        dispatch(setUsers({user: null, role: null}))
        navigate('/login')
        setLoading(false)
    }

    //회원가입
    function onSignup() {
        navigate('/sign-up')
    }
    return (
        <>
            {loading && <LoadingSppinner />}
            {user !== null ? (
                <SidebarItem sideTitle="Logout" isOpen={isOpen} onClick={onLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </SidebarItem>
            ) : (
                <>
                    <SidebarItem sideTitle="LogIn" isOpen={isOpen} onClick={onLogIn}>
                        <FontAwesomeIcon icon={faRightToBracket} />
                    </SidebarItem>
                    <SidebarItem sideTitle="Sign-up" isOpen={isOpen} onClick={onSignup}>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </SidebarItem>
                </>
            )}
        </>
    )
}
