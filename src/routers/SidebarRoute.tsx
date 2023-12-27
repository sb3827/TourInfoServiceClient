import {FC} from 'react'
import {useSelector} from 'react-redux'
import {RootState} from '../store/rootReducer'
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

type SidebarRouteProps = {
    isOpen: boolean
}

export const SidebarRoute: FC<SidebarRouteProps> = ({isOpen}) => {
    const user = useSelector((state: RootState) => state.login.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //로그인
    function onLogIn() {
        navigate('/login')
    }

    //로그아웃
    async function onLogout() {
        try {
            const data = await logoutRequest()
            localStorage.removeItem('token')
            Cookies.remove('refreshToken')
            dispatch(setUsers({user: null, role: null}))
            navigate('/login')
        } catch (e) {
            return e
        }
    }

    //회원가입
    function onSignup() {
        navigate('/sign-up')
    }
    return (
        <>
            {user !== null ? (
                <SidebarItem sideTitle="Logout" isOpen={isOpen} onClick={onLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} color="#4169E1" />
                </SidebarItem>
            ) : (
                <>
                    <SidebarItem sideTitle="LogIn" isOpen={isOpen} onClick={onLogIn}>
                        <FontAwesomeIcon icon={faRightToBracket} color="#4169E1" />
                    </SidebarItem>
                    <SidebarItem sideTitle="Sign-up" isOpen={isOpen} onClick={onSignup}>
                        <FontAwesomeIcon icon={faUserPlus} color="#4169E1" />
                    </SidebarItem>
                </>
            )}
        </>
    )
}
