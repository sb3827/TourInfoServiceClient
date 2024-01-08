import {Box, UserAvatar, ShowFollowModal, ShowTotalLikes} from './../../index'
import {Button} from './../../Button'

export const ProfileBox = () => {
    return (
        <div>
            <div>
                <Box className=" rounded-3xl">
                    <h1 className="mb-4 text-3xl text-black">My Profile</h1>
                    <UserAvatar />
                    <br />
                    <h1 className="text-3xl ">문영현</h1>
                    <br />
                    <ShowFollowModal />
                    <br />
                    <ShowTotalLikes />
                    <br />
                    <Button value="정보 수정" className="text-white bg-gray-400" />
                </Box>
            </div>
        </div>
    )
}
