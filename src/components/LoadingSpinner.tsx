import Loading from '../assets/loading.gif'

const LoadingSppinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <img src={Loading} className="w-20 h-20" alt="Loading..." />
        </div>
    )
}

export default LoadingSppinner
