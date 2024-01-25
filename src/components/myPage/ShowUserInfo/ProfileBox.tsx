import {Box, UserAvatar, ShowFollowModal, ShowTotalLikes} from './../../index'
import {Button} from './../../Button'
import {FC, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {userProfile, userFollows} from './../../../data/User/User'
import {ShowUserProfile, ShowUserFollowers} from './../../../api/MyPage/ShowUserInfo'
import {postFollow, deleteFollow} from './../../../api/UserSearch/UserSearch'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'

//TODO - 로그인 mno 받아와서 name 받아오기

type ProfileProps = {
    mno: number
}

export const ProfileBox: FC<ProfileProps> = ({mno}) => {
    const [userProfile, setUserProfile] = useState<userProfile | null>(null)
    const [followState, setFollowState] = useState<boolean>()

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const navigate = useNavigate()

    function onModify() {
        navigate('/mypage/modify')
    }

    async function onFollow() {
        await postFollow(mno, userMno)
        setFollowState(true)
        fetchData()
    }

    async function onUnfollow() {
        await deleteFollow(mno, userMno)
        setFollowState(false)
        fetchData()
    }

    const fetchData = async () => {
        try {
            const userProfileData = await ShowUserProfile(mno)
            const userFollowerData = await ShowUserFollowers(mno)
            setUserProfile(userProfileData)

            setFollowState(
                Array.isArray(userFollowerData) &&
                    userFollowerData
                        .map((followers: userFollows) => followers.mno)
                        .includes(userMno)
            )
        } catch (error) {
            console.error('에러 발생', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [mno, followState])

    return (
        <div>
            <div>
                <Box className=" rounded-3xl">
                    <h1 className="mb-4 text-3xl text-black">My Profile</h1>
                    <img
                        src={userProfile ? userProfile.image : ''}
                        alt="프로필이미지"
                        className="w-48 h-48 rounded-full "
                    />
                    <br />
                    <h1 className="text-3xl ">{userProfile ? userProfile.name : ''}</h1>
                    <br />
                    <ShowFollowModal
                        following={userProfile ? userProfile.followings.toString() : ''}
                        follower={userProfile ? userProfile.followers.toString() : ''}
                    />
                    <br />
                    {userMno === userProfile?.mno && (
                        <ShowTotalLikes
                            mno={Number(mno)}
                            cart={userProfile ? userProfile.cart : 0}
                        />
                    )}

                    <br />
                    {userMno === userProfile?.mno ? (
                        <Button
                            value="정보 수정"
                            onClick={onModify}
                            className="text-white bg-gray-400"
                        />
                    ) : followState === true ? (
                        <Button
                            value="언팔로우"
                            onClick={onUnfollow}
                            className="text-white bg-gray-400"
                        />
                    ) : (
                        <Button
                            value="팔로우"
                            onClick={onFollow}
                            className="text-white bg-gray-400"
                        />
                    )}
                </Box>
            </div>
        </div>
    )
}
