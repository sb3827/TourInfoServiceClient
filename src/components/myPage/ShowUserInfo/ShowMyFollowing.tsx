import image from './../../../assets/profileImage.jpeg'

export const ShowMyFollowing = () => {
    return (
        <div>
            <img
                src={image}
                alt="팔로잉"
                className="inline w-10 h-10 mr-2 rounded-full cursor-pointer"
            />
            <span className="mr-2 cursor-pointer hover:underline">팔로잉</span>
            <span className="cursor-pointer hover:underline">100</span>
        </div>
    )
}
