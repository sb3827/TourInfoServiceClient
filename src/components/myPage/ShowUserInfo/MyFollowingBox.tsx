import {FC, useState, useEffect} from 'react'
import {Subtitle} from './../../Texts'
import {ShowUserFollowings} from './../../../api/index'
import {userFollows} from './../../../data/User/User'
import profileImage from './../../../assets/profileImage.jpeg'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

type MyFollowingBoxProps = {
    mno: number
    closeModal: () => void
}
export const MyFollowingBox: FC<MyFollowingBoxProps> = ({mno, closeModal}) => {
    const [userFollowings, setUserFollowings] = useState<userFollows | null>(null)

    // const userMno = useSelector((state: RootState) => state.login.mno) || 0
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const userFollowingData = await ShowUserFollowings(mno)
            setUserFollowings(userFollowingData)
        } catch (error) {
            console.error('에러 발생', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                                    onClick={() => {
                                        navigate(`/mypage/${followings.mno}`)
                                        closeModal()
                                    }}
                                />
                            </div>
                            <span
                                className="flex items-center ml-8 cursor-pointer hover:underline"
                                onClick={() => {
                                    navigate(`/mypage/${followings.mno}`)
                                    closeModal()
                                }}>
                                {followings.name}
                            </span>
                            <button></button>
                        </div>
                    ))}
            </div>
        </div>
    )
}
