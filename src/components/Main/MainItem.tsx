import {FC, PropsWithChildren} from 'react'

type MainItemProps = {
    title: string
    image: string
    onClick?: () => void
}

export const MainItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div
            className="flex-row overflow-hidden bg-white border-2 rounded-lg shadow-md mx-14 hover:border-indigo-400 hover:cursor-pointer hover:border-solid"
            onClick={props.onClick}>
            <img
                src={props.image}
                alt={props.title}
                className="object-cover object-center w-full h-60"
            />
            <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{props.title}</h3>
            </div>
        </div>
    )
}

export const MostLikedMainItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div
            onClick={props.onClick}
            className="flex flex-col items-center justify-center py-10 overflow-hidden bg-white border-2 rounded-lg shadow-md mx-14 hover:border-indigo-400 hover:cursor-pointer hover:border-solid">
            <img
                src={props.image}
                alt={props.title}
                className="object-cover object-center w-1/2 h-80"
            />
            <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{props.title}</h3>
            </div>
        </div>
    )
}

export const MostLikedCourseItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div
            className="flex-row flex-1 mr-4 overflow-hidden bg-white border-2 rounded-lg shadow-md hover:border-indigo-400 hover:cursor-pointer hover:border-solid"
            onClick={props.onClick}>
            <img
                src={props.image}
                alt={props.title}
                className="object-cover object-center w-full h-80"
            />
            <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{props.title}</h3>
            </div>
        </div>
    )
}
