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
    image: string
    followings: number
    followers: number
}

// 사용자 정보
export type user = {
    mno: number | null
    image: string
    name: string
    email: string
    phone: string
    birth: string | null
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
    writer: string
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
    writer: string
    regdate: string
}

export type userFollows = {
    mno: number
    name: string
    image: string
}

export type userPlaceCount = {
    울산광역시: number
    대전광역시: number
    광주광역시: number
    전라남도: number
    부산광역시: number
    경기도: number
    전라북도: number
    경상남도: number
    대구광역시: number
    서울특별시: number
    충청북도: number
    충청남도: number
    제주특별자치도: number
    강원도: number
    경상북도: number
    인천광역시: number
    세종특별자치시: number
}
