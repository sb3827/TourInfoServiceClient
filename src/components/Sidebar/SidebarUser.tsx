import {FC, PropsWithChildren, useState} from 'react'
import UserImage from '../../assets/profileImage.jpeg'
import {LoadingSppinner, Subtitle} from '../index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logoutRequest} from '../../api'
import Cookies from 'js-cookie'
import {setUser} from '../../store/slices/LoginSlice'

type SidebarTitleProps = {}

export const SidebarTitle: FC<PropsWithChildren<SidebarTitleProps>> = ({children}) => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //마이페이지로 이동
    function onMypage() {
        navigate('/mypage')
    }

    //로그아웃
    async function onLogout() {
        setLoading(true)
        try {
            await logoutRequest()
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

    return (
        <div className="flex items-center justify-center w-full px-4 ">
            {loading && <LoadingSppinner />}
            {children}
            <div className="flex flex-col items-center w-full h-full ">
                <img
                    onClick={onMypage}
                    src={UserImage}
                    className="w-1/2 rounded-full cursor-pointer"
                />
                <Subtitle className="my-4 text-center text-white">user</Subtitle>
                <div
                    className="flex items-center my-2 mr-3 cursor-pointer"
                    onClick={onLogout}>
                    <FontAwesomeIcon size="sm" icon={faRightFromBracket} color="white" />
                    <p className="ml-2 text-sm text-white">Logout</p>
                </div>
            </div>
        </div>
    )
}
