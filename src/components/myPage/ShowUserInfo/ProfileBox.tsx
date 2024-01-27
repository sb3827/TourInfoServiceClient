import {Box, ShowFollowModal, ShowTotalLikes, Title, LoadingSppinner} from './../../index'
import {Button} from './../../Button'
import {FC, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {userProfile, userFollows} from './../../../data/User/User'
import {ShowUserProfile, ShowUserFollowings} from './../../../api/MyPage/ShowUserInfo'
import {postFollow, deleteFollow} from './../../../api/UserSearch/UserSearch'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'

//TODO - 로그인 mno 받아와서 name 받아오기

type ProfileProps = {
    mno: number
}

export const ProfileBox: FC<ProfileProps> = ({mno}) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [userProfile, setUserProfile] = useState<userProfile | null>(null)
    const [followState, setFollowState] = useState<boolean>()
    const [userFollowings, setUserFollowings] = useState<userFollows>()

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
            setLoading(true)
            const userProfileData = await ShowUserProfile(mno)
            const userFollowingData = await ShowUserFollowings(mno)
            setUserProfile(userProfileData)
            setUserFollowings(userFollowingData)
            console.log(userFollowingData)
            setLoading(false)
        } catch (error) {
            console.error('에러 발생', error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [mno])

    return (
        <div>
            {loading && <LoadingSppinner />}
            <div>
                <Box>
                    <div className="flex flex-col items-center justify-between h-full">
                        <Title className="text-2xl text-black mb-9 ">My Profile</Title>
                        <div className="w-32 h-32 overflow-hidden rounded-full">
                            <img
                                src={userProfile ? userProfile.image : ''}
                                alt="프로필이미지"
                            />
                        </div>
                        <br />
                        <h1 className="text-xl font-semibold">
                            {userProfile ? userProfile.name : ''}
                        </h1>
                        <br />
                        <ShowFollowModal
                            userName={userProfile?.name}
                            following={
                                userProfile ? userProfile.followings.toString() : ''
                            }
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
                                className="w-full text-white bg-lightGreen"
                            />
                        ) : followState === true ? (
                            <Button
                                value="언팔로우"
                                onClick={onUnfollow}
                                className="w-full text-white bg-red-500"
                            />
                        ) : (
                            <Button
                                value="팔로우"
                                onClick={onFollow}
                                className="w-full text-white bg-blue-500"
                            />
                        )}
                    </div>
                </Box>
            </div>
        </div>
    )
}
