import {FC} from 'react'
import {Outlet} from 'react-router-dom'
import Notion from '../../assets/Notion.png'
import GitHub from '../../assets/GitHub.png'

type FooterProps = {}

export const Footer: FC<FooterProps> = ({}) => {
    return (
        <div>
            <Outlet />
            <footer className="bg-gradient-to-t from-darkGreen to-lightGreen  flex justify-center w-full  min-w-[1024px]">
                <div className="flex flex-row justify-between w-2/3 my-8 text-white ">
                    <div className="my-auto">
                        <div className="flex items-start text-left">
                            <div>
                                <span className="text-2xl italic">
                                    여행의 발견 (Discovery of Travel)
                                </span>
                                <p className="w-full my-2 border-b"></p>
                                <p>Team. 배낭 가져와</p>
                                <p>Members. 김상백 이해창 문영현 홍희범 임윤서</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end">
                        <div className="flex flex-row justify-end my-2 text-xs">
                            <a
                                href="https://github.com/sb3827/TourInfoServiceClient"
                                className="flex flex-col items-center justify-between mx-2">
                                <img
                                    src={GitHub}
                                    className="w-6 bg-white rounded-full"
                                    alt="react repository"></img>
                                <p>React</p>
                            </a>
                            <a
                                href="https://github.com/sb3827/TourInfoServiceServer"
                                className="flex flex-col items-center justify-between mx-2">
                                <img
                                    src={GitHub}
                                    className="w-6 bg-white rounded-full"
                                    alt="spring repository"></img>
                                <p>Spring</p>
                            </a>
                            <a
                                href="http://sangbaek.notion.site/DoT-Discovery-of-Travel-f6c356624ee441ff9cbe1bfbe6ea72a4?pvs=74"
                                className="flex flex-col items-center justify-between ml-2">
                                <img
                                    src={Notion}
                                    className="w-6 bg-white rounded-full"
                                    alt="Notion"></img>
                                <p>Notion</p>
                            </a>
                        </div>
                        <p className="mt-2 text-xs">
                            Copyright 2024 All &copy; rights reserved
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
