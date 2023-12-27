// 로그인 데이터
//store 저장값
export type LoginUserData = {
    user: string | null
    role: string | null
}

//api 통신 값
export type LoginResponseData = {
    token: string
    refreshToken: string
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
