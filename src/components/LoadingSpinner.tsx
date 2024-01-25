import Loading from '../assets/loading.gif'

export const LoadingSppinner = () => {
    return (
        <div className="z-50 fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <img src={Loading} className="w-20 h-20" alt="Loading..." />
        </div>
    )
}

export const LoadingSppinnerSmall = () => {
    return (
        <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
            <img src={Loading} className="w-20 h-20" alt="Loading..." />
        </div>
    )
}
