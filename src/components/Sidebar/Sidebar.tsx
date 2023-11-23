import React, {FC, PropsWithChildren, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faBars,
    faTimes,
    faCogs,
    faTable,
    faList,
    faUser
} from '@fortawesome/free-solid-svg-icons'
import {SidebarItem} from './SidebarItem'

type SidebarProps = {}

export const Sidebar: FC<PropsWithChildren<SidebarProps>> = ({children}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleTrigger = () => setIsOpen(!isOpen)

    return (
        <div>
            <div className="h-full ml-auto opacity-70">
                <div>{children}</div>
                <div
                    className={`rounded-tr-3xl fixed top-0 w-14 h-full bg-gradient-to-b from-blue-300  transition-all pt-4 flex-col items-center  ${
                        isOpen ? 'w-64 transition-all' : ''
                    }`}>
                    <div
                        className="flex items-center justify-end px-4 text-2xl cursor-pointer h-14"
                        onClick={handleTrigger}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </div>
                    {/* merge 후 아래 바로 아래 SidebarItem은 변경 예정 - 사용자 이미지 및 이름 컴포넌트로 변경 */}
                    <SidebarItem sideTitle="Home" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faUser} color="#4169E1" />
                    </SidebarItem>
                    <SidebarItem sideTitle="Menu item 2" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faCogs} color="#4169E1" />
                    </SidebarItem>
                    <SidebarItem sideTitle="Menu item 3" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faTable} color="#4169E1" />
                    </SidebarItem>
                    <SidebarItem sideTitle="Menu item 4" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faList} color="#4169E1" />
                    </SidebarItem>
                </div>
            </div>
        </div>
    )
}
