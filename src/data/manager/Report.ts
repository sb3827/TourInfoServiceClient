//신고 정보
export type ReportData = {
    reportDate: Date //날짜
    listNum: number //게시글 번호
    userId: string //아이디
    reportedUser: string //신고 유저
    reportDetail: string //신고사유
}
