import {Box, UserAvatar, ShowFollowModal, ShowTotalLikes} from './../../index'
import {Button} from './../../Button'
import {FC, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {userProfile} from './../../../data/User/User'
import {ShowUserProfile} from './../../../api/MyPage/ShowUserInfo'

type ProfileProps = {}

export const ProfileBox: FC<ProfileProps> = () => {
    const [userProfile, setUserProfile] = useState<userProfile | null>(null)

    const navigate = useNavigate()

    function onModify() {
        navigate('/mypage/modify')
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfileData = await ShowUserProfile('이해창')
                setUserProfile(userProfileData)
                console.log(userProfileData)
            } catch (error) {
                console.error('에러 발생', error)
            }
        }
        fetchData()
    }, [])

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
                    {/* <UserAvatar src={userProfile ? userProfile.image : ''} /> */}
                    <br />
                    <h1 className="text-3xl ">{userProfile ? userProfile.name : ''}</h1>
                    <br />
                    <ShowFollowModal
                        following={userProfile ? userProfile.followings.toString() : ''}
                        follower={userProfile ? userProfile.followers.toString() : ''}
                    />
                    <br />
                    <ShowTotalLikes
                        cart={userProfile ? userProfile.cart.toString() : ''}
                    />
                    <br />
                    <Button
                        value="정보 수정"
                        onClick={onModify}
                        className="text-white bg-gray-400"
                    />
                </Box>
            </div>
        </div>
    )
}
