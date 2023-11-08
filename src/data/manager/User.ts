//일반 유저 정보
export type User = {
  userName: string
  userId: string
  userEmail: string
  phoneNum: string
  businessCheck: Boolean
}

//사업자 회원가입 대기 정보
export type WaitUser = {
  userName: string
  userId: string
  userEmail: string
  phoneNum: string
  businessNum: string
}
