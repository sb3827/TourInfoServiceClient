import {FC, PropsWithChildren} from 'react'
import UserImage from '../../assets/profileImage.jpeg'
import {Subtitle} from '../index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'

type SidebarTitleProps = {isOpen: boolean}

export const SidebarTitle: FC<PropsWithChildren<SidebarTitleProps>> = ({
    children,
    isOpen
}) => {
    //마이페이지로 이동
    function onMypage() {}

    return (
        <div
            onClick={onMypage}
            className={`flex items-center justify-center px-4 ${
                !isOpen
                    ? 'h-14 hover:bg-sky-200 hover:border-r-8 hover:border-r-blue-700 cursor-pointer'
                    : ''
            }`}>
            {children}
            {isOpen ? (
                <div className="flex flex-col items-center w-full h-full">
                    <img src={UserImage} className="w-1/2 rounded-full cursor-pointer" />
                    <Subtitle className="my-3 text-center">user</Subtitle>
                </div>
            ) : (
                <FontAwesomeIcon icon={faUser} color="#4169E1" />
            )}
        </div>
    )
}
