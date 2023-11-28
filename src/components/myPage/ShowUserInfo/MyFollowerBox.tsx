import image from './../../../assets/profileImage.jpeg'
import {FC, useState} from 'react'

// 팔로잉,팔로워 목록
type FollowerList = {
    id: number
    name: string
    isClicked: boolean
}

export const MyFollowerBox: FC = () => {
    const [follow, setFollow] = useState<FollowerList[]>([
        {id: 1, name: '김상백', isClicked: true},
        {id: 2, name: 'v_star', isClicked: false},
        {id: 3, name: '홍희범', isClicked: false}
        // 더미
    ])

    const onClickFollow = (id: number) => {
        setFollow(prevFollowers =>
            prevFollowers.map(follower =>
                // prettier-ignore
                follower.id === id ? {...follower, isClicked: !follower.isClicked} : follower
            )
        )
    }

    return (
        <div className="flex-row w-1/3 pt-4 pb-4 border-2">
            {follow.map(follower => (
                <div
                    key={follower.id}
                    className="flex items-center h-20 mb-4 border bg-green-50">
                    <img
                        src={image}
                        alt="프로필 사진"
                        className="inline w-12 h-12 ml-8 mr-8"
                    />
                    <span className="mr-8 text-xl">{follower.name}</span>
                    <button
                        className={`w-20 h-10 ml-auto mr-8 rounded-lg cursor-pointer ${
                            follower.isClicked ? 'bg-blue-600 text-black' : 'bg-blue-300'
                        }`}
                        onClick={() => onClickFollow(follower.id)}>
                        팔로우
                    </button>
                </div>
            ))}
        </div>
    )
}
