import {FC, useState, useEffect} from 'react'
import {Subtitle} from './../../Texts'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {ShowUserFollowers} from './../../../api/index'
import {userFollows} from './../../../data/User/User'
import profileImage from './../../../assets/profileImage.jpeg'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'

// 팔로잉,팔로워 목록
type FollowerList = {
    // mno: number
    // image: string
    // name: string
    // isClicked: boolean
}

export const MyFollowerBox: FC = () => {
    const [follow, setFollow] = useState<FollowerList[]>([])
    const [userFollowers, setUserFollowers] = useState<userFollows | null>(null)

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userFollowerData = await ShowUserFollowers(userMno)
                setUserFollowers(userFollowerData)
                console.log(userFollowerData)
            } catch (error) {
                console.error('에러 발생', error)
            }
        }
        fetchData()
    }, [])

    // const onClickFollow = (id: number) => {
    //     setFollow(prevFollowers =>
    //         prevFollowers.map(follower =>
    //             // prettier-ignore
    //             follower.mno === mno ? {...follower, isClicked: !follower.isClicked} : follower
    //         )
    //     )
    // }

    //TODO 프로필 이미지 없을 경우 이미지 변경, 클릭시 클릭한 사람의 프로필 조회
    return (
        <div>
            <div className="flex-row w-full pt-4 overflow-y-auto border-2 h-96 rounded-tr-3xl rounded-bl-3xl">
                <Subtitle value="팔로워" className="flex justify-center pb-4"></Subtitle>
                {Array.isArray(userFollowers) &&
                    userFollowers.map((followers: userFollows) => (
                        <div className="flex w-full h-20 border">
                            <a href="">
                                <img
                                    src={followers.image ? followers.image : profileImage}
                                    alt="프로필 사진"
                                    className="w-20 h-20 cursor-pointer"
                                />
                            </a>
                            <a
                                href=""
                                className="flex items-center ml-8 cursor-pointer hover:underline">
                                {followers.name}
                            </a>
                            <button></button>
                        </div>
                    ))}
                {/* {follow.map(follower => (
                    <div
                        key={userFollowings.mno}
                        className="flex items-center h-20 mb-4 border bg-green-50">
                        <img src="null" alt="프사" />
                        <button className="mr-8 text-xl hover:underline">
                            {userFollowings.name}
                        </button>
                        <button
                            className={`w-20 h-10 ml-auto mr-8 rounded-lg cursor-pointer ${
                                follower.isClicked
                                    ? 'bg-blue-600 text-black'
                                    : 'bg-blue-300'
                            }`}
                            onClick={() => onClickFollow(follower.mno)}>
                            팔로우
                        </button>
                    </div>
                ))} */}
            </div>
        </div>
    )
}
