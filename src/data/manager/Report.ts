//신고 정보 요청 결과
export type ReportResponseData = {
    result: boolean
    data: Array<{
        sno: number
        complainant_mno: number
        complainant: string
        defendant_mno: number
        defendant: string
        bno: number | null
        rno: number | null
        content: string
        isDone: boolean
        message: string
        regDate: string
    }>
}

//신고 정보
export type ReportData = {
    sno: number
    complainant_mno: number
    complainant: string
    defendant_mno: number
    defendant: string
    bno: number | null
    rno: number | null
    content: string
    isDone: boolean
    message: string
    regDate: string
}

//신고 업데이트등 요청 결과
export type ReportCheckData = {
    result: boolean
    data: number
}
