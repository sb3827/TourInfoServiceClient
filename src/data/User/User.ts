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

//유저 검색(관리자)
export type ManagerSearchUserData = {
    mno: number
    name: string
    email: string
    phone: string
    regDate: string
    role: string
    expDate: string
}

//회원가입 대기 조회
export type SignupWaitData = {
    mno: number
    name: string
    email: string
    businessId: string
}

//회원가입 승인 리턴값
export type MnoData = {
    mno: string
}

//유저 정보
export type UserInfoData = {
    mno: number
    image: string
    name: string
    email: string
    phone: string
    birth: Date
    role: string
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

// 유저 검색 정보
export type UserSearchData = {
    mno: number
    name: string
    profileImage: string
    following: number
    follower: number
}
