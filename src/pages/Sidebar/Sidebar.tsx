import {FC, PropsWithChildren, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faBars,
    faAnglesLeft,
    faRoute,
    faMapLocationDot,
    faFaceSmileBeam
} from '@fortawesome/free-solid-svg-icons'
import {Outlet, useNavigate} from 'react-router-dom'
import {SidebarItem, SidebarTitle} from '../../components'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {SidebarRoute} from '../../routers'
import {getCookie} from '../../util/cookie'

type SidebarProps = {}

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({children}) => {
    const user = getCookie('refreshToken')

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleTrigger = () => setIsOpen(!isOpen)

    const navigate = useNavigate()

    //메인 페이지로 이동
    function onMain() {
        navigate('/')
    }

    //장소 게시글 페이지로 이동
    function onPlace() {
        navigate('/board/place')
    }

    //코스 게시글 페이지로 이동
    function onCourse() {
        navigate('/board/course')
    }

    //유저 검색 페이지로 이동
    function onFindUser() {
        navigate('/search-user')
    }

    return (
        <div className="z-50">
            <div className="h-full ml-auto">
                <div>{children}</div>
                <div
                    className={`z-50 rounded-tr-3xl fixed top-0 w-14 h-full bg-gradient-to-b from-darkGreen transition-all duration-200 pt-4 flex-col items-center  ${
                        isOpen ? 'w-64' : ''
                    }`}>
                    <div
                        className={`flex items-center px-4 text-2xl h-14 ${
                            isOpen ? 'justify-end' : ' justify-center'
                        }`}>
                        <FontAwesomeIcon
                            className="cursor-pointer"
                            icon={isOpen ? faAnglesLeft : faBars}
                            onClick={handleTrigger}
                        />
                    </div>
                    {user && <SidebarTitle isOpen={isOpen} />}
                    {/* 서버 연결후 로그인 하지 않은 회원과 관리자 로그인했을때 SidebarItem 바꿔줄 필요 있음 */}
                    {/* 메인 페이지로 이동 */}
                    <SidebarItem sideTitle="Yum" isOpen={isOpen} onClick={onMain}>
                        <p className="font-bold">Ya!</p>
                    </SidebarItem>
                    {/* 장소 게시판으로 이동 */}
                    <SidebarItem
                        sideTitle="장소 게시판"
                        isOpen={isOpen}
                        onClick={onPlace}>
                        <FontAwesomeIcon icon={faMapLocationDot} />
                    </SidebarItem>
                    {/* 코스 게시판으로 이동 */}
                    <SidebarItem
                        sideTitle="코스 게시판"
                        isOpen={isOpen}
                        onClick={onCourse}>
                        <FontAwesomeIcon icon={faRoute} />
                    </SidebarItem>
                    <SidebarItem
                        sideTitle="유저 검색"
                        isOpen={isOpen}
                        onClick={onFindUser}>
                        <FontAwesomeIcon icon={faFaceSmileBeam} />
                    </SidebarItem>

                    <SidebarRoute isOpen={isOpen} />
                </div>
            </div>
            <Outlet />
        </div>
    )
}
