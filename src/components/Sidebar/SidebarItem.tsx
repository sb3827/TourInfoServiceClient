import React, {FC, PropsWithChildren, useState} from 'react'

type SidebarItemProps = {
    sideTitle: string
    isOpen: boolean
}
//children은 아이콘
//sideTitle은 아이콘의 제목
export const SidebarItem: FC<PropsWithChildren<SidebarItemProps>> = ({
    children,
    sideTitle,
    isOpen
}) => {
    return (
        <div className="h-14 cursor-pointer flex items-center px-4 text-left hover:bg-slate-400 hover:border-r-8 hover:border-red-800">
            {children}
            <span
                className={
                    !isOpen
                        ? `w-0 h-0 px-4 transition-all uppercase whitespace-nowrap overflow-hidden text-ellipsis `
                        : `flex justify-center w-full h-auto text-slate-200`
                }>
                {sideTitle}
            </span>
        </div>
    )
}
