import {
    user,
    userProfile,
    userReply,
    userBoard,
    userCourse,
    userFollows,
    userPlaceCount
} from './../../data/User/User'
import {refreshAxios} from './../Axios/RefreshAxios'
import {commonAxios} from './../Axios/CommonAxios'

// user정보 ( userName, userId, userEmail, phoneNum, regDate, businessCheck, suspendDate )

// 로그인 유저 정보

// 회원정보 수정 페이지에 사용될 사용자 정보
export const ShowUserInfo = async (mno: number): Promise<user> => {
    const response = await refreshAxios.get(`/users/info?mno=${mno}`)
    return response.data
}

// 회원정보 수정
export const onChangeUserData = async (userInfoDTO: user): Promise<void> => {
    console.log(userInfoDTO)

    const response = await refreshAxios.put('users/info/update', userInfoDTO)
    return response.data
}

// 마이페이지에 사용될 사용자 프로필 정보
export const ShowUserProfile = async (name: string): Promise<userProfile> => {
    const response = await commonAxios.get(`/users/profile?name=${name}`)
    return response.data
}

// 사용자가 작성한 댓글
export const ShowUserReply = async (mno: number): Promise<userReply> => {
    const response = await commonAxios.get(`/reply/member?mno=${mno}`)
    return response.data
}

// 작성 게시글
export const ShowUserBoard = async (mno: number): Promise<userBoard> => {
    const response = await commonAxios.get(`/board/place/posting/mno?mno=${mno}`)
    return response.data
}

// 작성 코스 게시글
export const ShowUserCourse = async (mno: number): Promise<userCourse> => {
    const response = await commonAxios.get(`/board/course/posting/mno?mno=${mno}`)
    return response.data
}

// 팔로잉 조회
export const ShowUserFollowings = async (mno: number): Promise<userFollows> => {
    const response = await commonAxios.get(`/follow/following?mno=${mno}`)
    return response.data
}

// 팔로워 조회
export const ShowUserFollowers = async (mno: number): Promise<userFollows> => {
    const response = await commonAxios.get(`/follow/follower?mno=${mno}`)
    return response.data
}

//방문수 조회
export const ShowPlaceCount = async (mno: number): Promise<userPlaceCount> => {
    const response = await commonAxios.get(`/place/placecount?mno=${mno}`)
    return response.data
}
