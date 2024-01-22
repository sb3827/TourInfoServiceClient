import {FC, PropsWithChildren} from 'react'

type MainItemProps = {
    title: string
    image: string
    onClick?: () => void
}

export const MainItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div
            className="flex flex-col overflow-hidden duration-150 bg-white border-2 rounded-lg shadow-md mx-14 hover:cursor-pointer hover:-translate-y-2 hover:shadow-xl"
            onClick={props.onClick}>
            <div className="w-full overflow-hidden">
                <img
                    src={props.image}
                    alt={props.title}
                    className="w-full duration-150 h-60 hover:scale-110"
                />
            </div>
            <div className="p-4 border-t-2">
                <h3 className="mb-2 text-xl font-semibold">{props.title}</h3>
            </div>
        </div>
    )
}

export const MostLikedMainItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div className="flex flex-col items-center justify-center py-10 overflow-hidden bg-green-50 mx-14 bg-opacity-80">
            <div
                onClick={props.onClick}
                className="flex flex-col items-center w-6/12 overflow-hidden duration-150 bg-white border-2 shadow-xl hover:cursor-pointer rounded-3xl hover:-translate-y-2 hover:shadow-2xl">
                <div className="w-full overflow-hidden">
                    <img
                        src={props.image}
                        alt={props.title}
                        className="w-full duration-150 h-80 hover:scale-110"
                    />
                </div>
                <div className="w-full p-4 border-t-2">
                    <h3 className="mb-2 text-xl font-semibold">{props.title}</h3>
                </div>
            </div>
        </div>
    )
}

export const MostLikedCourseItem: FC<PropsWithChildren<MainItemProps>> = props => {
    return (
        <div
            className="flex flex-col justify-between flex-1 overflow-hidden bg-white hover:cursor-pointer "
            onClick={props.onClick}>
            <div className="w-full overflow-hidden">
                <img
                    src={props.image}
                    alt={props.title}
                    className="w-full duration-150 h-80 hover:scale-110"
                />
            </div>
            <div className="p-6 border-t-2">
                <h3 className="text-xl font-semibold">{props.title}</h3>
            </div>
        </div>
    )
}
