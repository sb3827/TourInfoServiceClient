import {FC, PropsWithChildren, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faBars,
    faAnglesLeft,
    faRoute,
    faMapLocationDot
} from '@fortawesome/free-solid-svg-icons'
import {SidebarItem} from './SidebarItem'
import {SidebarTitle} from './SidebarTitle'

type SidebarProps = {}

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleTrigger = () => setIsOpen(!isOpen)

    return (
        <div>
            <div className="h-full ml-auto">
                <div>{children}</div>
                <div
                    className={` rounded-tr-3xl fixed top-0 w-14 h-full bg-gradient-to-b from-blue-300  transition-all duration-200 pt-4 flex-col items-center  ${
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
                    <SidebarTitle isOpen={isOpen} />
                    {/* 서버 연결후 로그인 하지 않은 회원과 관리자 로그인했을때 SidebarItem 바꿔줄 필요 있음 */}
                    {/* 메인 페이지로 이동 */}
                    <SidebarItem sideTitle="Yum" isOpen={isOpen}>
                        <p className="font-bold text-blue-500">Ya!</p>
                    </SidebarItem>
                    {/* 장소 게시판으로 이동 */}
                    <SidebarItem sideTitle="장소 게시판" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faMapLocationDot} color="#4169E1" />
                    </SidebarItem>
                    {/* 코스 게시판으로 이동 */}
                    <SidebarItem sideTitle="코스 게시판" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faRoute} color="#4169E1" />
                    </SidebarItem>
                </div>
            </div>
        </div>
    )
}
