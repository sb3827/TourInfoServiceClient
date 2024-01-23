import {Box, UserAvatar, ShowFollowModal, ShowTotalLikes} from './../../index'
import {Button} from './../../Button'
import {FC, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {userProfile} from './../../../data/User/User'
import {ShowUserProfile} from './../../../api/MyPage/ShowUserInfo'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'

//TODO - 로그인 mno 받아와서 name 받아오기

type ProfileProps = {
    mno: number
}

export const ProfileBox: FC<ProfileProps> = ({mno}) => {
    const [userProfile, setUserProfile] = useState<userProfile | null>(null)

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const navigate = useNavigate()

    function onModify() {
        navigate('/mypage/modify')
    }

    const fetchData = async () => {
        try {
            const userProfileData = await ShowUserProfile(mno)
            setUserProfile(userProfileData)
            console.log(userProfileData)
        } catch (error) {
            console.error('에러 발생', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [mno])

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
                    <ShowTotalLikes cart={userProfile ? userProfile.cart : 0} />
                    <br />
                    {userMno === userProfile?.mno && (
                        <Button
                            value="정보 수정"
                            onClick={onModify}
                            className="text-white bg-gray-400"
                        />
                    )}
                </Box>
            </div>
        </div>
    )
}
