import {FC, useState, useEffect} from 'react'
import {Subtitle} from './../../Texts'
import {ShowUserFollowers} from './../../../api/index'
import {userFollows} from './../../../data/User/User'
import profileImage from './../../../assets/profileImage.jpeg'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Button} from './../../../components'

type MyFollowerBoxProps = {
    mno: number
    closeModal: () => void
}

export const MyFollowerBox: FC<MyFollowerBoxProps> = ({mno, closeModal}) => {
    const [userFollowers, setUserFollowers] = useState<userFollows | null>(null)
    const navigate = useNavigate()
    // const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const fetchData = async () => {
        try {
            const userFollowerData = await ShowUserFollowers(mno)
            setUserFollowers(userFollowerData)
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
                <Subtitle value="팔로워" className="flex justify-center pb-4"></Subtitle>
                {Array.isArray(userFollowers) &&
                    userFollowers.map((followers: userFollows) => (
                        <div className="flex w-full h-20 border">
                            <div
                                onClick={() => {
                                    navigate(`/mypage/${followers.mno}`)
                                    closeModal()
                                }}>
                                <img
                                    src={followers.image ? followers.image : profileImage}
                                    alt="프로필 사진"
                                    className="w-20 h-20 cursor-pointer"
                                />
                            </div>
                            <span
                                className="flex items-center ml-8 cursor-pointer hover:underline"
                                onClick={() => {
                                    navigate(`/mypage/${followers.mno}`)
                                    closeModal()
                                }}>
                                {followers.name}
                            </span>
                        </div>
                    ))}
            </div>
        </div>
    )
}
