import {FC, useState} from 'react'
import {LoadingSppinner, SidebarItem} from '../components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faRightFromBracket,
    faRightToBracket,
    faUserGear,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {logoutRequest} from '../api/Login/Login'
import {useDispatch} from 'react-redux'
import {getWithTokenExpire} from '../util/localStorage'
import {setUser} from '../store/slices/LoginSlice'
import {getCookie} from '../util/cookie'
import {useSelector} from 'react-redux'
import {RootState} from '../store/rootReducer'

type SidebarRouteProps = {
    isOpen: boolean
}

export const SidebarRoute: FC<SidebarRouteProps> = ({isOpen}) => {
    const [loading, setLoading] = useState(false)

    const user = getWithTokenExpire('token')
    const refreshToken = getCookie('refreshToken')
    const role = useSelector((state: RootState) => state.login.role)

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
        dispatch(setUser({mno: null, role: null}))
        navigate('/login')
        setLoading(false)
    }

    //회원가입
    function onSignup() {
        navigate('/sign-up')
    }

    //관리자 페이지로
    function onManager() {
        navigate('/manager')
    }
    return (
        <>
            {loading && <LoadingSppinner />}
            {refreshToken || user !== null ? (
                <>
                    <SidebarItem sideTitle="Logout" isOpen={isOpen} onClick={onLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </SidebarItem>
                    {role === 'ADMIN' && (
                        <SidebarItem
                            sideTitle="관리자 페이지"
                            isOpen={isOpen}
                            onClick={onManager}>
                            <FontAwesomeIcon icon={faUserGear} />
                        </SidebarItem>
                    )}
                </>
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
