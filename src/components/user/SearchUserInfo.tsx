import {FC, useState} from 'react'
import {Button} from '../../components/index'
import {UserSearchData} from '../../data/User/User'
import {useNavigate} from 'react-router-dom'
import {postFollow, deleteFollow} from '../../api/UserSearch/UserSearch'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import UserImage from '../../assets/profileImage.jpeg'

type SearchResultProps = {
    userInfo: UserSearchData
}

export const SearchUserInfo: FC<SearchResultProps> = ({userInfo}) => {
    const navigate = useNavigate()

    // user mno
    const user = useSelector((state: RootState) => state.login.mno)!

    const [follow, setFollow] = useState<boolean>(userInfo.followCheck)
    const [totalFollow, setTotalFollow] = useState<number>(userInfo.followers)
    const [buttonText, setButtonText] = useState<string>(
        userInfo.followCheck ? '팔로잉' : '팔로우'
    )

    if (totalFollow == null) {
        setTotalFollow(0)
    }

    async function clickFollow() {
        try {
            if (!user || !userInfo) return
            if (follow) {
                // 이미 팔로우 중이라면 언팔로우
                await deleteFollow(userInfo.mno, user)
                setTotalFollow(totalFollow - 1)
                setFollow(!follow)
                setButtonText('팔로우')
            } else {
                await postFollow(userInfo.mno, user)
                setTotalFollow(totalFollow + 1)
                setFollow(!follow)
                setButtonText('팔로잉')
            }
        } catch (error) {
            console.log(error)
        }
    }

    //FIXME - 유저 검색창에서 유저 프로필을 보러가야하는데 어떤 링크를 작성 해야 하는지 모르겠습니다
    const onUserDetail = () => {
        navigate(`/mypage/${userInfo.mno}`)
    }

    return (
        <div
            className="flex w-full h-32 my-5 duration-100 border shadow cursor-pointer border-lightGreen stats hover:shadow-xl"
            onClick={onUserDetail}>
            <div className="flex flex-col justify-center flex-2 stat">
                <div className="stat-figure text-secondary">
                    <div className="w-16 h-16 overflow-hidden rounded-full ">
                        <img
                            src={userInfo?.image ? userInfo.image : UserImage}
                            alt="profileImage"
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="my-1 text-base stat-value">{userInfo?.name}</div>
            </div>

            <div className="flex-2 stat border-lightGreen">
                <div className="stat-title">Total Follower</div>
                <div className="text-base text-rose-500 stat-value">{totalFollow}</div>
            </div>
            <div className="stat flex-2 border-lightGreen">
                <div className="stat-title">Total Following</div>
                <div className="text-base stat-value text-primary">
                    {userInfo?.followings ? userInfo.followings : 0}
                </div>
            </div>

            {user && (
                <div className="flex-1 stat border-lightGreen">
                    <div className="mt-4">
                        <Button
                            value={buttonText}
                            onClick={clickFollow}
                            className={`w-24 h-16 text-lg text-center ${
                                follow ? 'text-blue-500' : 'text-lightGreen'
                            }`}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
