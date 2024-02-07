import {FC} from 'react'
import {Outlet} from 'react-router-dom'
import Notion from '../assets/Notion.png'
import GitHub from '../assets/GitHub.png'

type FooterProps = {}

export const Footer: FC<FooterProps> = ({}) => {
    return (
        <div>
            <Outlet />
            <footer className="hidden w-full text-gray-300 md:flex bg-slate-600">
                <div className="flex flex-row justify-between w-screen mx-8 my-3">
                    <div className="my-auto">
                        <div className="text-left">
                            <span className="text-2xl font-semibold">
                                여행의 발견 (Discovery of Travel)
                            </span>
                            <p className="">of</p>
                            <span className="">Team. 배낭 가져와</span>
                        </div>
                    </div>
                    <div className="my-auto">
                        <div className="flex flex-row justify-end my-2 text-xs">
                            <a
                                href="https://github.com/sb3827/TourInfoServiceClient"
                                className="flex flex-col items-center justify-between mx-2">
                                <img
                                    src={GitHub}
                                    className="w-6 bg-white rounded-full"
                                    alt="react repository"></img>
                                <p>react</p>
                            </a>
                            <a
                                href="https://github.com/sb3827/TourInfoServiceServer"
                                className="flex flex-col items-center justify-between mx-2">
                                <img
                                    src={GitHub}
                                    className="w-6 bg-white rounded-full"
                                    alt="spring repository"></img>
                                <p>spring</p>
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
