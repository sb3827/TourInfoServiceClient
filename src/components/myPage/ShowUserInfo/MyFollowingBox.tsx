import {FC, useState, useEffect} from 'react'
import {Subtitle} from './../../Texts'
import {ShowUserFollowings} from './../../../api/index'
import {userFollows} from './../../../data/User/User'
import profileImage from './../../../assets/profileImage.jpeg'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export const MyFollowingBox: FC = () => {
    const [userFollowings, setUserFollowings] = useState<userFollows | null>(null)

    const userMno = useSelector((state: RootState) => state.login.mno) || 0
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const userFollowingData = await ShowUserFollowings(userMno)
            setUserFollowings(userFollowingData)
            console.log(userFollowingData)
        } catch (error) {
            console.error('에러 발생', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    //TODO 프로필 이미지 없을 경우 이미지 변경, 클릭시 클릭한 사람의 프로필 조회
    return (
        <div>
            <div className="flex-row w-full pt-4 overflow-y-auto border-2 h-96 rounded-tr-3xl rounded-bl-3xl">
                <Subtitle value="팔로잉" className="flex justify-center pb-4"></Subtitle>
                {Array.isArray(userFollowings) &&
                    userFollowings.map((followings: userFollows) => (
                        <div className="flex w-full h-20 border">
                            <div>
                                <img
                                    src={
                                        followings.image ? followings.image : profileImage
                                    }
                                    alt="프로필 사진"
                                    className="w-20 h-20 cursor-pointer"
                                />
                            </div>
                            <span className="flex items-center ml-8 cursor-pointer hover:underline">
                                {followings.name}
                            </span>
                            <button></button>
                        </div>
                    ))}
            </div>
        </div>
    )
}
