import {FC, PropsWithChildren} from 'react'

type MainItemProps = {
    title: string
    description: string
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
                <p className="mb-4 text-gray-500">{props.description}</p>
            </div>
        </div>
    )
}

export const MostLikedMainItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div className="flex-row overflow-hidden bg-white border-2 rounded-lg shadow-md mx-14 hover:border-indigo-400 hover:cursor-pointer hover:border-solid">
            <img
                src={props.image}
                alt={props.title}
                className="object-cover object-center w-full h-80"
            />
            <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{props.title}</h3>
                <p className="mb-4 text-gray-500">{props.description}</p>
            </div>
        </div>
    )
}

export const MostLikedCourseItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div
            className="flex-row flex-1 mx-4 overflow-hidden bg-white border-2 rounded-lg shadow-md hover:border-indigo-400 hover:cursor-pointer hover:border-solid"
            onClick={props.onClick}>
            <img
                src={props.image}
                alt={props.title}
                className="object-cover object-center w-full h-80"
            />
            <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{props.title}</h3>
                <p className="mb-4 text-gray-500">{props.description}</p>
            </div>
        </div>
    )
}
