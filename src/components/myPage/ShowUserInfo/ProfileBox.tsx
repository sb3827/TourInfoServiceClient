import {Box, UserAvatar, UserInfo} from './../../index'

export const ProfileBox = () => {
    return (
        <div>
            <div className="flex items-center justify-center bg-gray-500 rounded-3xl ">
                <Box>
                    <UserAvatar />
                    <UserInfo text="이름" />
                    <button className="inline cursor-pointer hover:underline">
                        팔로잉
                    </button>
                    <span> 100</span>
                    <button className="inline cursor-pointer hover:underline">
                        팔로워
                    </button>
                    <span> 100</span>
                    <UserInfo text="찜목록" />
                    <button className="cursor-pointer hover:underline">정보 수정</button>
                </Box>
            </div>
        </div>
    )
}
