import React, {FC} from 'react'
import { Button } from "../../components/index";
import { UserSearchData } from "../../data/User/User";
import { useNavigate } from "react-router-dom"
import { postFollow, deleteFollow } from "../../api/UserSearch/UserSearch";

type SearchResultProps = {
    userInfo : UserSearchData | null
}

export const SearchUserInfo: FC<SearchResultProps> = ({ userInfo }) => {

    const navigate = useNavigate();

    



    // 미구현
    const handleReviewClick = () => {
        navigate(``)
    }

    return (
        <div className="flex w-full h-40 border border-gray-200 shadow stats ">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <img
                        src={userInfo?.image}
                        alt="profileImage"
                        className="w-24 rounded-full"
                    />
                </div>
                <div className="mt-8 stat-value">{userInfo?.name}</div>
            </div>

            <div className="stat">
                <div className="stat-title">Total Follower</div>
                <div className="text-rose-500 stat-value">{userInfo?.followers}</div>
            </div>
            <div className="stat">
                <div className="stat-title">Total Following</div>
                <div className="stat-value text-primary">{userInfo?.followings}</div>
            </div>

            <div className='stat'>
                <div className='mt-2'>
                <Button  className="w-32 h-20 text-2xl text-darkGreen" value={'프로필'} />
                <Button  className="w-32 h-20 text-2xl text-darkGreen" value={'팔로우'} />
                </div>
            </div>
        </div>
    )
}
