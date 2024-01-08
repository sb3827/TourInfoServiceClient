// 로그인 데이터
//store 저장값
export type LoginUserData = {
    mno: number | null
    role: string | null
}

//api 통신 값
export type LoginResponseData = {
    response: {
        tokens: {
            token: string
            refreshToken: string
        }
        mno: number
    }
}

//수정 해야함
//일반 유저 정보
export type UserData = {
    userName: string
    userId: string
    userEmail: string
    phoneNum: string
    regDate: Date
    businessCheck: Boolean
    suspendDate?: string | Date
}

//사업자 회원가입 대기 정보
export type WaitUserData = {
    userName: string
    userId: string
    userEmail: string
    phoneNum: string
    businessNum: string
}

// 제재 이력 정보
export type suspendDate = {
    suspendStartDate: Date
    suspendEndDate: Date
    suspendReason: string
}

// 사용자 정보
export type user = {
    mno: number
    image: string
    name: string
    email: string
    phone: string
    birth: Date
    role: string
}

// 사용자 프로필
export type userProfile = {
    mno: number
    name: string
    followings: number
    followers: number
    cart: number
    image: string
}

// 사용자가 작성한 장소 포스팅 게시글
export type userBoard = {
    bno: number
    title: string
    name: string
    regdate: string
}

// 사용자가 작성한 댓글 ( 게시글 번호, 게시글 제목, 댓글 내용, 등록 날짜 )
export type userReply = {
    rno: number
    mno: number
    bno: number
    title: string
    text: string
    regdate: string
}

// 사용자가 작성한 코스 게시글
export type userCourse = {
    bno: number
    title: string
    name: string
    regdate: string
}
