import React, {FC, PropsWithChildren, useState} from 'react'
import ReactDOM from 'react-dom'
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
            <div className="page">
                <div>{children}</div>

                <div
                    className={`fixed top-0 w-14 h-full bg-slate-600 border-r-2 transition-all pt-4 ${
                        isOpen ? 'w-64 transition-all' : ''
                    }`}>
                    <div
                        className="h-14 text-2xl cursor-pointer flex items-center justify-end px-3 pb-4"
                        onClick={handleTrigger}>
                        <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
                    </div>
                    <SidebarItem sideTitle="Home" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faUser} />
                    </SidebarItem>
                    <SidebarItem sideTitle="Menu item 2" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faCogs} />
                    </SidebarItem>
                    <SidebarItem sideTitle="Menu item 3" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faTable} />
                    </SidebarItem>
                    <SidebarItem sideTitle="Menu item 4" isOpen={isOpen}>
                        <FontAwesomeIcon icon={faList} />
                    </SidebarItem>
                </div>
            </div>
        </div>
    )
}
