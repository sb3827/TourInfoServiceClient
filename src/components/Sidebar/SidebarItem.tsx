import {FC, MouseEventHandler, PropsWithChildren, useState} from 'react'

type SidebarItemProps = {
    sideTitle?: string
    isOpen: boolean
    onClick?: MouseEventHandler<HTMLDivElement>
}
//children은 아이콘
//sideTitle은 아이콘의 제목
export const SidebarItem: FC<PropsWithChildren<SidebarItemProps>> = ({
    children,
    sideTitle,
    isOpen,
    onClick
}) => {
    return (
        <div
            onClick={onClick}
            className="flex items-center justify-center px-4 text-left transition-all duration-100 cursor-pointer h-14 hover:bg-sky-200 hover:border-r-8 hover:border-r-blue-700">
            {children}
            <span
                className={
                    !isOpen
                        ? `hidden w-0 h-0 px-4 uppercase whitespace-nowrap overflow-hidden text-ellipsis `
                        : `flex justify-center w-full h-auto`
                }>
                {sideTitle}
            </span>
        </div>
    )
}
