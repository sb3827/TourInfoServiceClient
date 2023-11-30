import {FC} from 'react'

type FooterProps = {}

const Footer: FC<FooterProps> = ({}) => {
    return (
        <div className="flex items-center justify-center w-full mt-8 text-xs text-center text-gray-300  bg-slate-600">
            <div className="flex-row items-center justify-center py-2">
                <p className="m-2">배낭 가져와 - 야! 먹고놀자</p>
                <p className="m-2">
                    Git Hub :&nbsp;
                    <a
                        href="https://github.com/sb3827/TourInfoServiceClient"
                        className="text-gray-300 underline cursor-pointer hover:text-gray-300 hover:underline">
                        https://github.com/sb3827/TourInfoServiceClient
                    </a>
                </p>
                <p className="m-2">Copyright 2023 All &copy; rights reserved</p>
            </div>
        </div>
    )
}

export default Footer
